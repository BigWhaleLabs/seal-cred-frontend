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
const fillCircle = fill('fill-gray')

const SuperOrb = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 107.21 88.47"
  >
    <defs>
      <linearGradient
        id="a"
        x1="-513.57"
        y1="113.84"
        x2="-513.57"
        y2="113.84"
        gradientTransform="translate(587.07 -66.06)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#efecd6" />
        <stop offset="1" stop-color="#01feb6" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="-586.57"
        y1="113.84"
        x2="-586.57"
        y2="113.84"
        xlinkHref="#a"
      />
      <mask
        id="c"
        x="8.78"
        y="1"
        width="80.22"
        height="82.87"
        maskUnits="userSpaceOnUse"
      >
        <g transform="translate(-48.02 -4.86)">
          <circle cx="101.52" cy="46.36" r="30.5" className={fillCircle} />
        </g>
      </mask>
      <radialGradient
        id="d"
        cx="-2654.78"
        cy="541.93"
        r="1"
        gradientTransform="matrix(-5.91, 36.3, 36.3, 5.91, -35301.51, 93203.21)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#31b5ff" />
        <stop offset="1" stop-color="#ff87c8" />
      </radialGradient>
      <radialGradient
        id="e"
        cx="-2606.64"
        cy="520.37"
        r="1"
        gradientTransform="matrix(16.97, 30.07, 30.07, -16.97, 28628.21, 87238.5)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#5200ff" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        id="f"
        cx="-2702.64"
        cy="578.69"
        r="1"
        gradientTransform="matrix(-11.17, 16.86, 20.29, 13.44, -41848.06, 37818.82)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#fff" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <mask
        id="g"
        x="23"
        y="11"
        width="84.21"
        height="77.47"
        maskUnits="userSpaceOnUse"
      >
        <g transform="translate(-48.02 -4.86)">
          <circle cx="101.52" cy="46.36" r="30.5" className={fillOrb} />
        </g>
      </mask>
      <radialGradient
        id="h"
        cx="-2664.21"
        cy="550.53"
        r="1"
        gradientTransform="matrix(-9.88, 33.4, 32.11, 9.5, -43947.05, 83791.62)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.62" stop-color="#fff" stop-opacity="0" />
        <stop offset="0.8" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#fff" />
      </radialGradient>
      <radialGradient
        id="i"
        cx="-2562.26"
        cy="487.38"
        r="1"
        gradientTransform="matrix(19.8, 9.86, 14.4, -16.39, 43783.9, 33312.99)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#ffe600" />
        <stop offset="1" stop-color="#ffe600" stop-opacity="0" />
      </radialGradient>
    </defs>
    <path
      d="M73.5,47.78"
      transform="translate(-48.02 -4.86)"
      fill="none"
      stroke-linecap="round"
      stroke="url(#a)"
    />
    <path
      d="M.5,47.78"
      transform="translate(-48.02 -4.86)"
      fill="none"
      stroke-linecap="round"
      stroke="url(#b)"
    />
    <circle
      cx="53"
      cy="41"
      r="40"
      className={strokeWhite(true)}
      stroke-linecap="round"
      stroke-width="2"
    />
    <g mask="url(#c)">
      <circle cx="53.5" cy="41.5" r="30.5" fill="url(#d)" />
      <circle cx="53.5" cy="41.5" r="30.5" fill="url(#e)" />
      <circle cx="53.5" cy="41.5" r="30.5" fill="url(#f)" />
      <g mask="url(#g)">
        <circle cx="53.5" cy="41.5" r="30.5" fill="url(#h)" />
        <polygon
          points="39 68.76 67.61 36.2 107.21 55.91 78.6 88.47 39 68.76"
          fill="url(#i)"
        />
      </g>
      <rect x="53.47" y="1" width="35.53" height="35.08" fill="none" />
      <path
        d="M56.8,39.86h49.48V88.73H56.8Z"
        transform="translate(-48.02 -4.86)"
        fill="none"
      />
    </g>
    <path
      d="M102,68.86A23,23,0,0,1,85.65,29.7M102,22.86A23,23,0,0,1,118.39,62"
      transform="translate(-48.02 -4.86)"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
      stroke-width="2"
    />
    <path
      d="M87,45.86a15,15,0,0,1,25.54-10.67M117,45.86A15,15,0,0,1,91.48,56.53"
      transform="translate(-48.02 -4.86)"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
      stroke-width="2"
    />
    <path
      d="M102,38.86a7,7,0,0,1,5,11.92m-5,2.08a7,7,0,0,1-5-11.92"
      transform="translate(-48.02 -4.86)"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
      stroke-width="2"
    />
    <line
      x1="0.5"
      y1="46.5"
      x2="25.5"
      y2="46.5"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
    />
    <line
      x1="80.5"
      y1="46.5"
      x2="105.5"
      y2="46.5"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
    />
    <line
      x1="0.5"
      y1="38.5"
      x2="25.5"
      y2="38.5"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
    />
    <line
      x1="80.5"
      y1="38.5"
      x2="105.5"
      y2="38.5"
      fill="none"
      className={strokeWhite()}
      stroke-linecap="round"
    />
    <path
      d="M109.35-364.21"
      transform="translate(-48.02 -4.86)"
      fill="none"
      className={strokeAccent}
    />
  </svg>
)

const UpperConnectors = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 202 725"
  >
    <defs>
      <linearGradient
        id="a"
        x1="-524.69"
        y1="790.56"
        x2="-584.92"
        y2="790.56"
        gradientTransform="translate(587.07 -66.06)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#efecd6" />
        <stop offset="1" stop-color="#01feb6" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="-447.51"
        y1="790.56"
        x2="-385.07"
        y2="790.56"
        gradientTransform="translate(587.07 -66.06)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#efecd6" />
        <stop offset="1" stop-color="#ff7bed" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="101.5"
        y1="503"
        x2="101.5"
        y2="1186"
        gradientTransform="matrix(1, 0, 0, -1, 0, 1186)"
        gradientUnits="userSpaceOnUse"
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
    <line
      x1="0.5"
      y1="33.5"
      x2="0.5"
      y2="724.5"
      fill="none"
      className={strokeTertiary}
      stroke-linecap="round"
    />
    <line
      x1="0.5"
      y1="724.5"
      x2="73.5"
      y2="724.5"
      fill="none"
      stroke-linecap="round"
      stroke="url(#a)"
    />
    <line
      x1="128.5"
      y1="724.5"
      x2="201.5"
      y2="724.5"
      fill="none"
      stroke-linecap="round"
      stroke="url(#b)"
    />
    <line
      x1="201.5"
      y1="47.5"
      x2="201.5"
      y2="724.5"
      fill="none"
      className={strokeSecondary}
      stroke-linecap="round"
    />
    <line x1="101.5" x2="101.5" y2="683" fill="none" stroke="url(#c)" />
    <path d="M109.35,312.51" fill="none" className={strokeAccent} />
  </svg>
)

const BottomConnectors = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 425.5">
    <path
      d="M86.25,0V343L4.75,424.5"
      transform="translate(-4.25 0.5)"
      fill="none"
      className={strokeTertiary}
      stroke-linecap="round"
    />
    <path
      d="M102.25,0V343l-81.5,81.5"
      transform="translate(-4.25 0.5)"
      fill="none"
      className={strokeAccent}
      stroke-linecap="round"
    />
    <path
      d="M118.25,0V343l81.5,81.5"
      transform="translate(-4.25 0.5)"
      fill="none"
      className={strokeSecondary}
      stroke-linecap="round"
    />
    <path
      d="M109.35,235.28"
      transform="translate(-4.25 0.5)"
      fill="none"
      className={strokeAccent}
    />
    <path
      d="M109.35-447.72"
      transform="translate(-4.25 0.5)"
      fill="none"
      className={strokeAccent}
    />
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
      <div style={{ width: '13.2rem', height: '73.75rem' }}>
        <div className={position('relative')}>
          <UpperConnectors />
          <div
            className={superOrbBox(glow)}
            style={{
              width: '13.2rem',
              height: '12.625rem',
              bottom: '-6.938rem',
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
