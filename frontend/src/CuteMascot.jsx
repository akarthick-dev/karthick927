export default function CuteMascot({ theme = 'light', size = 'h-9 w-9', className = '' }) {
  const isNight = theme === 'dark';

  return (
    <span
      className={`cute-mascot-wrapper relative grid ${size} place-items-center rounded-xl bg-gradient-to-br from-red-500 via-rose-500 to-blue-600 p-[1.5px] shadow-md shadow-red-500/25 group-hover:scale-110 transition-all duration-300 ${className}`}
      title={isNight ? 'Cute AI Companion (Sleeping in Night Mode)' : 'Cute AI Companion (Awake in Light Mode)'}
      aria-label="Cute AI Companion Icon"
    >
      <span className="relative flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950/90 overflow-hidden backdrop-blur-sm">
        <svg
          viewBox="0 0 36 36"
          className="cute-mascot-svg h-full w-full select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mascotGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="eyeGlow" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cute Ears */}
          <g className="mascot-ears">
            <path
              d="M7 13 L12 18 L6 18 Z"
              fill="url(#mascotGradient)"
              className="mascot-ear-left"
            />
            <path
              d="M8.5 14.5 L11 17.5 L7.5 17.5 Z"
              fill={isNight ? '#c084fc' : '#fda4af'}
              className="mascot-ear-inner-left"
            />
            <path
              d="M29 13 L30 18 L24 18 Z"
              fill="url(#mascotGradient)"
              className="mascot-ear-right"
            />
            <path
              d="M27.5 14.5 L28.5 17.5 L25 17.5 Z"
              fill="#93c5fd"
              className="mascot-ear-inner-right"
            />
          </g>

          {/* Antenna with theme-aware LED pulse */}
          <g className="mascot-antenna">
            <line x1="18" y1="12" x2="18" y2="6" stroke="url(#mascotGradient)" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="18" cy="5" r="3.2" fill={isNight ? '#818cf8' : '#f43f5e'} className="mascot-antenna-pulse" />
            <circle cx="18" cy="5" r="2" fill={isNight ? '#6366f1' : '#f43f5e'} className="mascot-antenna-orb" />
            <circle cx="17.4" cy="4.4" r="0.6" fill="#ffffff" />
          </g>

          {/* Head Visor Base */}
          <rect
            x="6"
            y="12"
            width="24"
            height="18"
            rx="6"
            fill={isNight ? '#05070e' : '#090d16'}
            stroke="url(#mascotGradient)"
            strokeWidth="1.3"
            className="mascot-visor"
          />

          {/* Visor Glass Highlight */}
          <path
            d="M9 14.5 Q18 13 27 14.5"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Rosy Blush Cheeks (dreamy warm glow in night mode) */}
          <ellipse cx="9.5" cy="22.5" rx="2" ry="1.2" fill={isNight ? '#f472b6' : '#fb7185'} className="mascot-blush" />
          <ellipse cx="26.5" cy="22.5" rx="2" ry="1.2" fill={isNight ? '#f472b6' : '#fb7185'} className="mascot-blush" />

          {/* Eyes: Happy sleepy curves in Night Mode vs Wide-Awake Anime Eyes in Day Mode */}
          {isNight ? (
            <g className="mascot-night-eyes">
              {/* Left Happy Curved Eyelid */}
              <path
                d="M10.5 21.2 Q13 17.8 15.5 21.2"
                stroke="#67e8f9"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                className="mascot-sleepy-eye-left"
              />
              {/* Right Happy Curved Eyelid */}
              <path
                d="M20.5 21.2 Q23 17.8 25.5 21.2"
                stroke="#67e8f9"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                className="mascot-sleepy-eye-right"
              />
            </g>
          ) : (
            <g className="mascot-eyes">
              {/* Left Wide-Awake Eye */}
              <g className="mascot-eye mascot-eye-left">
                <ellipse cx="13" cy="19.5" rx="2.3" ry="3.2" fill="url(#eyeGlow)" filter="url(#glowFilter)" />
                <circle cx="13.8" cy="18.2" r="1" fill="#ffffff" />
                <circle cx="12.3" cy="20.8" r="0.5" fill="#ffffff" />
              </g>

              {/* Right Wide-Awake Eye */}
              <g className="mascot-eye mascot-eye-right">
                <ellipse cx="23" cy="19.5" rx="2.3" ry="3.2" fill="url(#eyeGlow)" filter="url(#glowFilter)" />
                <circle cx="23.8" cy="18.2" r="1" fill="#ffffff" />
                <circle cx="22.3" cy="20.8" r="0.5" fill="#ffffff" />
              </g>
            </g>
          )}

          {/* Cute Smile (peaceful in night mode, cheerful in day mode) */}
          <path
            d={isNight ? 'M16.5 23.8 Q18 25.5 19.5 23.8' : 'M16 23.5 Q18 26 20 23.5'}
            stroke="#67e8f9"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            className="mascot-smile"
          />

          {/* Floating Accents: Golden Crescent Moon in Night Mode vs Twinkle Star in Day Mode */}
          {isNight ? (
            <path
              d="M27.5 5.5 A3 3 0 0 0 31 8.5 A3.5 3.5 0 1 1 27.5 5.5 Z"
              fill="#facc15"
              className="mascot-night-moon"
            />
          ) : (
            <path
              d="M29 6 L29.7 7.7 L31.5 8.2 L29.7 8.7 L29 10.5 L28.3 8.7 L26.5 8.2 L28.3 7.7 Z"
              fill="#fde047"
              className="mascot-sparkle"
            />
          )}
        </svg>
      </span>
    </span>
  );
}
