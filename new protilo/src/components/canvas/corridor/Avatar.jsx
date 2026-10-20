import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { VRMAnimationLoaderPlugin, createVRMAnimationClip } from '@pixiv/three-vrm-animation';
import { useSiteConfig } from '../../../context/SiteConfigContext';

// Default waving animation frames as fallback
const DEFAULT_FRAMES = Array.from({ length: 9 }, (_, i) => `/textures/corridor/avatar_anim/${i + 1}.webp`);

/**
 * Avatar Component - Sana 3D AI Companion
 * 
 * Features:
 * - Loads Sana VRM model (/vrm/sana2.vrm or /vrm/sana.vrm) with @pixiv/three-vrm
 * - Smiling expression: happy + joy = 0.95, eyes wide open (no closed eye / blink bug)
 * - Dodge logic: smoothly steps aside when camera approaches in corridor
 * - Natural idle sway / waving animation
 * - Seamless 2D sketch frame fallback during initial load
 */
const Avatar = ({ position = [0, -0.61, -0.3] }) => {
    const { homeContent } = useSiteConfig();
    const frames = homeContent?.avatarFrames?.length ? homeContent.avatarFrames : DEFAULT_FRAMES;
    const TOTAL_FRAMES = frames.length;

    const groupRef = useRef();
    const vrmContainerRef = useRef();
    const meshRef = useRef();
    const vrmRef = useRef(null);
    const mixerRef = useRef(null);
    const [vrmReady, setVrmReady] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 1.2, height: 2.4 });
    const { camera } = useThree();

    // Dodge state
    const dodgeX = useRef(0);
    const targetDodgeX = useRef(0);
    const worldPosVec = useRef(new THREE.Vector3());

    // --- 2D FRAME-BY-FRAME FALLBACK TEXTURES ---
    const textures = useTexture(frames);
    const currentFrame = useRef(0);
    const isReversing = useRef(false);
    const frameTimer = useRef(0);

    // Apply color space and calculate dimensions for 2D fallback
    useEffect(() => {
        textures.forEach(tex => {
            if (tex) tex.colorSpace = THREE.SRGBColorSpace;
        });

        if (textures[0] && textures[0].image) {
            const aspectRatio = textures[0].image.width / textures[0].image.height;
            const baseHeight = 2.3;
            setDimensions({
                width: baseHeight * aspectRatio,
                height: baseHeight
            });
        }

        if (currentFrame.current >= textures.length) {
            currentFrame.current = Math.max(0, textures.length - 1);
        }

        if (meshRef.current && textures[currentFrame.current]) {
            meshRef.current.material.map = textures[currentFrame.current];
            meshRef.current.material.needsUpdate = true;
        }
    }, [textures]);

    // --- 3D VRM MODEL LOADING ---
    useEffect(() => {
        let isMounted = true;
        const loader = new GLTFLoader();
        loader.register((parser) => new VRMLoaderPlugin(parser));
        loader.register((parser) => new VRMAnimationLoaderPlugin(parser));

        const modelUrl = '/vrm/sana.vrm';

        loader.load(
            modelUrl,
            (gltf) => {
                if (!isMounted) return;
                const vrm = gltf.userData.vrm;
                if (!vrm) {
                    console.warn('[Avatar] No VRM instance found in GLTF userData');
                    return;
                }

                // Clean unnecessary vertices and joints
                try {
                    VRMUtils.removeUnnecessaryVertices(vrm.scene);
                    VRMUtils.removeUnnecessaryJoints(vrm.scene);
                } catch (e) {
                    // Ignore optimization warning if any
                }

                // Face front (+Z direction towards camera)
                vrm.scene.rotation.y = Math.PI;

                // Scale and position adjustment to match corridor floor
                vrm.scene.scale.set(1.4, 1.4, 1.4);
                vrm.scene.position.set(0, -1.05, 0);

                // Enable shadow casting / receiving and bright materials
                vrm.scene.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.frustumCulled = false;
                        if (obj.material) {
                            obj.material.needsUpdate = true;
                        }
                    }
                });

                // Set neutral face with eyes open (blink = 0, joy/happy = 0)
                if (vrm.expressionManager) {
                    try {
                        vrm.expressionManager.setValue('neutral', 1.0);
                        vrm.expressionManager.setValue('happy', 0.0);
                        vrm.expressionManager.setValue('joy', 0.0);
                        vrm.expressionManager.setValue('blink', 0.0);
                        vrm.expressionManager.setValue('blinkLeft', 0.0);
                        vrm.expressionManager.setValue('blinkRight', 0.0);
                        vrm.expressionManager.update();
                    } catch (exprErr) {
                        console.warn('[Avatar] Expression set warning:', exprErr);
                    }
                }

                vrmRef.current = vrm;

                if (vrmContainerRef.current) {
                    // Clear previous children
                    while (vrmContainerRef.current.children.length > 0) {
                        vrmContainerRef.current.remove(vrmContainerRef.current.children[0]);
                    }
                    vrmContainerRef.current.add(vrm.scene);
                }

                // Try loading waving animation clip
                const animLoader = new GLTFLoader();
                animLoader.register((parser) => new VRMAnimationLoaderPlugin(parser));
                animLoader.load(
                    '/vrma/Waving.vrma',
                    (animGltf) => {
                        if (!isMounted) return;
                        const vrmAnimations = animGltf?.userData?.vrmAnimations;
                        const vrmAnimation = Array.isArray(vrmAnimations) ? vrmAnimations[0] : null;
                        if (vrmAnimation && vrm) {
                            try {
                                const clip = createVRMAnimationClip(vrmAnimation, vrm);
                                if (clip) {
                                    const mixer = new THREE.AnimationMixer(vrm.scene);
                                    const action = mixer.clipAction(clip);
                                    action.setLoop(THREE.LoopRepeat);
                                    action.play();
                                    mixerRef.current = mixer;
                                }
                            } catch (clipErr) {
                                console.warn('[Avatar] Waving VRMA clip error:', clipErr);
                            }
                        }
                    },
                    undefined,
                    () => {
                        // VRMA optional, procedural animation will run in useFrame
                    }
                );

                setVrmReady(true);
            },
            undefined,
            (err) => {
                console.warn('[Avatar] VRM load fallback to 2D:', err);
                setVrmReady(false);
            }
        );

        return () => {
            isMounted = false;
            if (vrmRef.current) {
                try {
                    VRMUtils.deepDispose(vrmRef.current.scene);
                } catch (e) {
                    // Ignore dispose error
                }
            }
        };
    }, []);

    // Main animation loop
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // === DODGE LOGIC ===
        groupRef.current.getWorldPosition(worldPosVec.current);
        const distance = camera.position.z - worldPosVec.current.z;

        const DODGE_START = 3.5;
        const DODGE_PEAK = 0.2;
        const DODGE_END = -2.2;
        const DODGE_AMOUNT = -1.5; // Smoothly dodge to the left

        if (distance > DODGE_PEAK && distance < DODGE_START) {
            const t = (DODGE_START - distance) / (DODGE_START - DODGE_PEAK);
            targetDodgeX.current = DODGE_AMOUNT * easeOutQuad(t);
        } else if (distance <= DODGE_PEAK && distance > DODGE_END) {
            const t = (distance - DODGE_END) / (DODGE_PEAK - DODGE_END);
            targetDodgeX.current = DODGE_AMOUNT * easeOutQuad(t);
        } else {
            targetDodgeX.current = 0;
        }

        dodgeX.current = THREE.MathUtils.lerp(dodgeX.current, targetDodgeX.current, 0.08);

        groupRef.current.position.x = position[0] + dodgeX.current;
        groupRef.current.position.y = position[1];

        // === VRM UPDATE & PROCEDURAL MOTION ===
        if (vrmRef.current) {
            const time = state.clock.getElapsedTime();
            const vrm = vrmRef.current;

            // Update AnimationMixer if clip is playing
            if (mixerRef.current) {
                mixerRef.current.update(delta);
            } else if (vrm.humanoid) {
                // Procedural idle breathing and cheerful waving
                const rightUpperArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');
                const rightLowerArm = vrm.humanoid.getNormalizedBoneNode('rightLowerArm');
                const rightHand = vrm.humanoid.getNormalizedBoneNode('rightHand');
                const spine = vrm.humanoid.getNormalizedBoneNode('spine');
                const head = vrm.humanoid.getNormalizedBoneNode('head');

                if (spine) {
                    spine.rotation.x = Math.sin(time * 1.5) * 0.02;
                }
                if (head) {
                    head.rotation.y = Math.sin(time * 0.8) * 0.06;
                    head.rotation.z = Math.cos(time * 0.8) * 0.03;
                }
                if (rightUpperArm) {
                    rightUpperArm.rotation.z = 1.25 + Math.sin(time * 3.5) * 0.15;
                    rightUpperArm.rotation.x = 0.2;
                }
                if (rightLowerArm) {
                    rightLowerArm.rotation.y = -0.5 + Math.sin(time * 5.0) * 0.25;
                }
                if (rightHand) {
                    rightHand.rotation.z = Math.sin(time * 6.0) * 0.2;
                }
            }

            // Keep eyes open and smiling with mouth
            if (vrm.expressionManager) {
                vrm.expressionManager.setValue('neutral', 1.0);
                vrm.expressionManager.setValue('happy', 0.0);
                vrm.expressionManager.setValue('joy', 0.0);
                vrm.expressionManager.setValue('blink', 0.0);
                vrm.expressionManager.setValue('blinkLeft', 0.0);
                vrm.expressionManager.setValue('blinkRight', 0.0);
                vrm.expressionManager.update();
            }

            vrm.update(delta);

            // Direct morph target application for natural smiling mouth with wide open eyes
            vrm.scene.traverse((obj) => {
                if (obj.isMesh && obj.morphTargetDictionary && obj.morphTargetInfluences) {
                    const dict = obj.morphTargetDictionary;
                    const infl = obj.morphTargetInfluences;
                    // Smile with mouth and brows
                    if (dict['Fcl_MTH_Fun'] !== undefined) infl[dict['Fcl_MTH_Fun']] = 0.85;
                    if (dict['Fcl_BRW_Fun'] !== undefined) infl[dict['Fcl_BRW_Fun']] = 0.35;
                    // Strictly keep eyes wide open (never allow eyelids to shut or squint)
                    if (dict['Fcl_EYE_Joy'] !== undefined) infl[dict['Fcl_EYE_Joy']] = 0.0;
                    if (dict['Fcl_EYE_Joy_L'] !== undefined) infl[dict['Fcl_EYE_Joy_L']] = 0.0;
                    if (dict['Fcl_EYE_Joy_R'] !== undefined) infl[dict['Fcl_EYE_Joy_R']] = 0.0;
                    if (dict['Fcl_EYE_Close'] !== undefined) infl[dict['Fcl_EYE_Close']] = 0.0;
                    if (dict['Fcl_EYE_Close_L'] !== undefined) infl[dict['Fcl_EYE_Close_L']] = 0.0;
                    if (dict['Fcl_EYE_Close_R'] !== undefined) infl[dict['Fcl_EYE_Close_R']] = 0.0;
                    if (dict['Fcl_EYE_Sorrow'] !== undefined) infl[dict['Fcl_EYE_Sorrow']] = 0.0;
                    if (dict['Fcl_EYE_Sorrow_L'] !== undefined) infl[dict['Fcl_EYE_Sorrow_L']] = 0.0;
                    if (dict['Fcl_EYE_Sorrow_R'] !== undefined) infl[dict['Fcl_EYE_Sorrow_R']] = 0.0;
                    if (dict['Fcl_EYE_Surprised'] !== undefined) infl[dict['Fcl_EYE_Surprised']] = 0.1;
                    if (dict['Fcl_EYE_Natural'] !== undefined) infl[dict['Fcl_EYE_Natural']] = 1.0;
                }
            });
        }

        // === 2D FRAME-BY-FRAME FALLBACK ANIMATION ===
        if (!vrmReady && meshRef.current) {
            const FPS = 20;
            const frameDuration = 1 / FPS;
            frameTimer.current += delta;

            if (TOTAL_FRAMES > 1 && frameTimer.current >= frameDuration) {
                frameTimer.current = 0;

                if (currentFrame.current >= TOTAL_FRAMES - 1) {
                    isReversing.current = true;
                } else if (currentFrame.current <= 0) {
                    isReversing.current = false;
                }

                currentFrame.current += isReversing.current ? -1 : 1;
                const safeIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrame.current));

                meshRef.current.material.map = textures[safeIndex];
                meshRef.current.material.needsUpdate = true;
            }
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* 3D Sana VRM Container */}
            <group ref={vrmContainerRef} visible={vrmReady} />

            {/* 2D Fallback Sketch Sprite (visible until VRM loads) */}
            {!vrmReady && (
                <mesh ref={meshRef}>
                    <planeGeometry args={[dimensions.width, dimensions.height]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent={true}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>
            )}
        </group>
    );
};

// Easing function
const easeOutQuad = (t) => t * (2 - t);

export default Avatar;
