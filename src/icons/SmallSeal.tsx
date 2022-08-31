import { displayTo } from 'helpers/visibilityClassnames'
import { stroke } from 'classnames/tailwind'

const pathColor = (connected?: boolean) =>
  stroke(connected ? 'stroke-secondary' : 'stroke-primary-semi-dimmed')
const svgStyles = displayTo('sm')

export default function ({ connected }: { connected?: boolean }) {
  return connected ? (
    <svg
      width="25"
      height="25"
      viewBox="0 0 20 20"
      className={svgStyles}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0.738739C5.02944 0.738739 1 4.8886 1 10.0077V17.5387C3.33333 18.8386 10.2 20.6584 19 17.5387V10.0077C19 4.8886 14.9706 0.738739 10 0.738739Z"
        className={pathColor(connected)}
      />
      <path
        d="M11.935 7.92504C11.935 6.78858 12.8314 5.8673 13.9372 5.8673C15.043 5.8673 15.9395 6.78858 15.9395 7.92504C15.9395 9.06151 15.043 7.92507 13.9372 7.92507C12.8314 7.92507 11.935 9.06151 11.935 7.92504Z"
        className={pathColor(connected)}
      />
      <path
        d="M10.0001 11.674C10.7483 11.674 11.3549 11.7637 11.3549 10.9054C11.3549 10.0472 10.7483 9.35139 10.0001 9.35139C9.25181 9.35139 8.64522 10.0472 8.64522 10.9054C8.64522 11.7637 9.25181 11.674 10.0001 11.674ZM10.0001 11.674C10.0001 12.1901 10.0001 13.3385 10.0001 13.803M10.0001 13.803C10.0001 15.3514 11.9355 15.3514 11.9355 13.803M10.0001 13.803C10.0001 15.3514 8.06458 15.3514 8.06458 13.8031"
        className={pathColor(connected)}
      />
      <path
        d="M4.19282 7.92602C4.19282 6.78956 5.08924 5.86827 6.19504 5.86827C7.30084 5.86827 8.19727 6.78956 8.19727 7.92602C8.19727 9.06248 7.30084 7.92604 6.19504 7.92604C5.08924 7.92604 4.19282 9.06248 4.19282 7.92602Z"
        className={pathColor(connected)}
      />
      <path
        d="M16.1937 11.6743L13.8711 12.0614"
        className={pathColor(connected)}
      />
      <path
        d="M13.8708 13.8227L16.1934 14.2098"
        className={pathColor(connected)}
      />
      <path
        d="M3.80633 11.6743L6.12891 12.0614"
        className={pathColor(connected)}
      />
      <path
        d="M6.12922 13.8227L3.80664 14.2098"
        className={pathColor(connected)}
      />
    </svg>
  ) : (
    <svg
      width="25"
      height="25"
      viewBox="0 0 20 20"
      className={svgStyles}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0.738739C5.02944 0.738739 1 4.8886 1 10.0077V17.5387C3.33333 18.8386 10.2 20.6584 19 17.5387V10.0077C19 4.8886 14.9706 0.738739 10 0.738739Z"
        className={pathColor(connected)}
      />
      <path
        d="M16.0594 7.47753C15.4912 8.46173 14.2542 8.81138 13.2965 8.25848C12.3389 7.70558 12.0232 6.45951 12.5914 5.4753C13.1597 4.4911 13.3678 5.9235 14.3254 6.4764C15.2831 7.0293 16.6276 6.49332 16.0594 7.47753Z"
        className={pathColor(connected)}
      />
      <path
        d="M10.0001 11.674C10.7483 11.674 11.3549 11.7637 11.3549 10.9054C11.3549 10.0471 10.7483 9.35139 10.0001 9.35139C9.25181 9.35139 8.64522 10.0471 8.64522 10.9054C8.64522 11.7637 9.25181 11.674 10.0001 11.674ZM10.0001 11.674C10.0001 12.1901 10.0001 13.3385 10.0001 13.803M10.0001 13.803C10.0001 15.3514 12 14 12 15.5M10.0001 13.803C10.0001 15.3514 8 14.1969 8.06458 15.5"
        className={pathColor(connected)}
      />
      <path
        d="M7.54082 5.47628C8.10905 6.46049 7.79336 7.70655 6.83571 8.25945C5.87806 8.81235 4.64109 8.46271 4.07286 7.47851C3.50463 6.4943 4.84918 7.03027 5.80683 6.47737C6.76448 5.92448 6.97259 4.49208 7.54082 5.47628Z"
        className={pathColor(connected)}
      />
      <path
        d="M16.1937 11.6743L13.8711 12.0614"
        className={pathColor(connected)}
      />
      <path
        d="M13.8708 13.8227L16.1934 14.2098"
        className={pathColor(connected)}
      />
      <path
        d="M3.80633 11.6743L6.12891 12.0614"
        className={pathColor(connected)}
      />
      <path
        d="M6.12922 13.8227L3.80664 14.2098"
        className={pathColor(connected)}
      />
    </svg>
  )
}
