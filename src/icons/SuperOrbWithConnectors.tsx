import classnames, {
  dropShadow,
  fill,
  margin,
  position,
  scale,
  stroke,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useScrollPercent from 'hooks/useScrollPercent'

const strokeAccent = stroke('stroke-accent')
const strokeSecondary = stroke('stroke-secondary')
const strokeTertiary = stroke('stroke-tertiary')
const strokeWhite = (isFill?: boolean) =>
  classnames(
    stroke('stroke-formal-accent'),
    fill(isFill ? 'fill-primary-dark' : undefined)
  )
const fillOrb = fill('fill-orb')

const SuperOrb = () => (
  <svg
    viewBox="0 0 107.21 88.47"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <linearGradient
        gradientTransform="matrix(1, 0, 0, -1, 0, 1186)"
        gradientUnits="userSpaceOnUse"
        id="c"
        x1="101.5"
        x2="101.5"
        y1="503"
        y2="1186"
      >
        <stop offset="0" stop-color="#efecd6" />
        <stop offset="0.03" stop-color="#f1e9be" />
        <stop offset="0.08" stop-color="#f4e59a" />
        <stop offset="0.14" stop-color="#f7e27a" />
        <stop offset="0.2" stop-color="#f9df5e" />
        <stop offset="0.27" stop-color="#fbdc48" />
        <stop offset="0.35" stop-color="#fcda37" />
        <stop offset="0.46" stop-color="#fdd92c" />
        <stop offset="0.6" stop-color="#fed825" />
        <stop offset="1" stop-color="#fed823" />
      </linearGradient>
      <radialGradient
        cx="-2654.78"
        cy="541.93"
        gradientTransform="matrix(-5.91, 36.3, 36.3, 5.91, -35301.51, 93203.21)"
        gradientUnits="userSpaceOnUse"
        id="d"
        r="1"
      >
        <stop offset="0" stop-color="#31b5ff" />
        <stop offset="1" stop-color="#ff87c8" />
      </radialGradient>
      <radialGradient
        cx="-2606.64"
        cy="520.37"
        gradientTransform="matrix(16.97, 30.07, 30.07, -16.97, 28628.21, 87238.5)"
        gradientUnits="userSpaceOnUse"
        id="e"
        r="1"
      >
        <stop offset="0" stop-color="#5200ff" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        cx="-2702.64"
        cy="578.69"
        gradientTransform="matrix(-11.17, 16.86, 20.29, 13.44, -41848.06, 37818.82)"
        gradientUnits="userSpaceOnUse"
        id="f"
        r="1"
      >
        <stop offset="0" stop-color="#fff" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <mask
        height="77.47"
        id="g"
        maskUnits="userSpaceOnUse"
        width="84.21"
        x="23"
        y="11"
      >
        <g transform="translate(-48.02 -4.86)">
          <circle className={fillOrb} cx="101.52" cy="46.36" r="30.5" />
        </g>
      </mask>
      <radialGradient
        cx="-2664.21"
        cy="550.53"
        gradientTransform="matrix(-9.88, 33.4, 32.11, 9.5, -43947.05, 83791.62)"
        gradientUnits="userSpaceOnUse"
        id="h"
        r="1"
      >
        <stop offset="0.62" stop-color="#fff" stop-opacity="0" />
        <stop offset="0.8" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#fff" />
      </radialGradient>
      <radialGradient
        cx="-2562.26"
        cy="487.38"
        gradientTransform="matrix(19.8, 9.86, 14.4, -16.39, 43783.9, 33312.99)"
        gradientUnits="userSpaceOnUse"
        id="i"
        r="1"
      >
        <stop offset="0" stop-color="#ffe600" />
        <stop offset="1" stop-color="#ffe600" stop-opacity="0" />
      </radialGradient>
    </defs>
    <path
      className={strokeTertiary}
      d="M73.5,47.78"
      transform="translate(-48.02 -4.86)"
    />
    <path
      className={strokeSecondary}
      d="M.5,47.78"
      transform="translate(-48.02 -4.86)"
    />
    <circle
      className={strokeWhite(true)}
      cx="53"
      cy="41"
      r="40"
      stroke-width="2"
    />
    <g mask="url(#c)">
      <circle
        className={dropShadow('drop-shadow-formal-accent')}
        cx="53.5"
        cy="41.5"
        fill="url(#d)"
        r="30.5"
      />
      <circle cx="53.5" cy="41.5" fill="url(#e)" r="30.5" />
      <circle cx="53.5" cy="41.5" fill="url(#f)" r="30.5" />
      <g mask="url(#g)">
        <circle cx="53.5" cy="41.5" fill="url(#h)" r="30.5" />
        <polygon
          fill="url(#i)"
          points="39 68.76 67.61 36.2 107.21 55.91 78.6 88.47 39 68.76"
        />
      </g>
      <rect height="35.08" width="35.53" x="53.47" y="1" />
      <path
        d="M56.8,39.86h49.48V88.73H56.8Z"
        transform="translate(-48.02 -4.86)"
      />
    </g>
    <path
      className={strokeWhite()}
      d="M102,68.86A23,23,0,0,1,85.65,29.7M102,22.86A23,23,0,0,1,118.39,62"
      stroke-width="2"
      transform="translate(-48.02 -4.86)"
    />
    <path
      className={strokeWhite()}
      d="M87,45.86a15,15,0,0,1,25.54-10.67M117,45.86A15,15,0,0,1,91.48,56.53"
      stroke-width="2"
      transform="translate(-48.02 -4.86)"
    />
    <path
      className={strokeWhite()}
      d="M102,38.86a7,7,0,0,1,5,11.92m-5,2.08a7,7,0,0,1-5-11.92"
      stroke-width="2"
      transform="translate(-48.02 -4.86)"
    />
    <line className={strokeWhite()} x1="0.5" x2="25.5" y1="46.5" y2="46.5" />
    <line className={strokeWhite()} x1="80.5" x2="105.5" y1="46.5" y2="46.5" />
    <line className={strokeWhite()} x1="0.5" x2="25.5" y1="38.5" y2="38.5" />
    <line className={strokeWhite()} x1="80.5" x2="105.5" y1="38.5" y2="38.5" />
    <path
      className={strokeAccent}
      d="M109.35-364.21"
      transform="translate(-48.02 -4.86)"
    />
  </svg>
)

const UpperConnectors = () => (
  <svg
    className={strokeSecondary}
    viewBox="0 0 202 725"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <linearGradient
        gradientTransform="matrix(1, 0, 0, -1, 0, 1186)"
        gradientUnits="userSpaceOnUse"
        id="c"
        x1="101.5"
        x2="101.5"
        y1="503"
        y2="1186"
      >
        <stop offset="0" stop-color="#efecd6" />
        <stop offset="0.03" stop-color="#f1e9be" />
        <stop offset="0.08" stop-color="#f4e59a" />
        <stop offset="0.14" stop-color="#f7e27a" />
        <stop offset="0.2" stop-color="#f9df5e" />
        <stop offset="0.27" stop-color="#fbdc48" />
        <stop offset="0.35" stop-color="#fcda37" />
        <stop offset="0.46" stop-color="#fdd92c" />
        <stop offset="0.6" stop-color="#fed825" />
        <stop offset="1" stop-color="#fed823" />
      </linearGradient>
    </defs>
    <line className={strokeTertiary} x1="9.25" x2="9.25" y1="60" y2="724.5" />
    <line className={strokeTertiary} x1="9.5" x2="73.5" y1="724.5" y2="724.5" />
    <line x1="128.5" x2="193" y1="724.5" y2="724.5" />
    <line x1="193.25" x2="193.25" y1="70" y2="724.5" />
    <line stroke="url(#c)" x1="100.5" x2="100.5" y1="30" y2="690" />
  </svg>
)

const BottomConnectors = () => (
  <svg
    className={strokeAccent}
    viewBox="0 0 196 425.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={strokeTertiary}
      d="M86.25,0V343L4.75,424.5"
      transform="translate(-4.25 0.5)"
    />
    <path d="M102.25,0V343l-81.5,81.5" transform="translate(-4.25 0.5)" />
    <path
      className={strokeSecondary}
      d="M118.25,0V343l81.5,81.5"
      transform="translate(-4.25 0.5)"
    />
    <path d="M109.35,235.28" transform="translate(-4.25 0.5)" />
    <path d="M109.35-447.72" transform="translate(-4.25 0.5)" />
  </svg>
)

const superOrbBox = (glow?: boolean) =>
  classnames(
    position('absolute'),
    scale('scale-50'),
    dropShadow(glow ? 'drop-shadow-formal-accent' : undefined),
    transitionProperty('transition-all'),
    zIndex('z-40')
  )

export default function () {
  const scroll = useScrollPercent()

  const glow = scroll > 0.48

  return (
    <>
      <div style={{ height: '73.75rem', width: '12.625rem' }}>
        <div className={position('relative')}>
          <UpperConnectors />
          <div
            className={superOrbBox(glow)}
            style={{
              bottom: '-6.938rem',
              height: '12.625rem',
              width: '12.625rem',
            }}
          >
            <SuperOrb />
          </div>
        </div>
        <div className={margin('mt-5')}>
          <BottomConnectors />
        </div>
      </div>
    </>
  )
}
