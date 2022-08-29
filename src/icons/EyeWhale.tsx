import classnames, {
  dropShadow,
  fill,
  stroke,
  strokeWidth,
} from 'classnames/tailwind'

const mainStroke = classnames(stroke('stroke-primary'), strokeWidth('stroke-2'))
const fillPrimary = fill('fill-primary')
const strokeEye = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-2')
)
const svgShadow = dropShadow('drop-shadow-primary')

export default function () {
  return (
    <svg
      width="88"
      height="78"
      viewBox="0 0 88 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgShadow}
    >
      <path
        d="M50.4961 65.6909C53.5854 69.398 66.3667 82.7756 83.1722 73.8785C80.083 71.2012 74.2639 64.1332 74.2639 60.179"
        className={mainStroke}
      />
      <path
        d="M1.61719 39.2756C6.35405 38.2458 17.4342 38.0399 23.8599 45.4541C31.8919 54.7219 48.2567 77.8004 75.4422 58.6468"
        className={mainStroke}
      />
      <path
        d="M57.5668 72.2407C52.8691 74.0919 47.7514 75.1088 42.3961 75.1088C19.5337 75.1088 1 56.5752 1 33.7128C17.5037 22.8409 26.5054 23.6638 33.6969 27.6917"
        className={mainStroke}
      />
      <circle cx="57.9965" cy="30.9215" r="4.1996" className={strokeEye} />
      <circle cx="24.113" cy="35.7217" r="2.10133" className={fillPrimary} />
      <path
        d="M43 35.7184C46.5789 39.2771 53.4042 41.7232 57.7498 41.7232C63.8594 41.7232 75.3969 36.8883 75.3969 30.9242C75.3969 25.1857 64.2488 20.4926 57.9986 20.1458"
        className={mainStroke}
      />
      <path
        d="M55.5971 65.9943C72.4954 65.9943 86.1942 52.2955 86.1942 35.3972C86.1942 18.4988 72.4954 4.80005 55.5971 4.80005C49.6484 4.80005 44.0961 6.49769 39.3984 9.43493"
        className={mainStroke}
      />
      <path
        d="M39.4003 9.30456C29.1293 3.46215 21.197 9.09886 18.0415 12.262C19.1129 12.5248 21.6857 13.0781 23.4052 13.189C25.5546 13.3276 26.0996 16.4619 28.6046 18.8095C30.6086 20.6875 33.6856 20.9727 34.9737 20.8805C31.8368 23.6113 33.6095 27.8765 34.9108 31.7234C35.9518 34.801 34.7848 38.5409 34.0711 40.0262C48.9292 34.8968 46.4682 24.8069 45.9997 22.2033C45.7407 20.7644 47.1279 20.0252 48.9994 19.2111"
        className={mainStroke}
      />
      <path d="M58 20.095L58 16.1953" className={mainStroke} />
      <line
        x1="58.1953"
        y1="46.9934"
        x2="58.1953"
        y2="42.394"
        className={mainStroke}
      />
      <line
        x1="64.5938"
        y1="20.1808"
        x2="66.1793"
        y2="18.5953"
        className={mainStroke}
      />
      <path
        d="M51.3964 19.8957L50.496 19.1933C49.5961 18.5933 48.1551 19.6132 47.1952 20.0931"
        className={mainStroke}
      />
      <line
        x1="51.3945"
        y1="41.6068"
        x2="49.809"
        y2="43.1923"
        className={mainStroke}
      />
      <line
        x1="66.1756"
        y1="43.1907"
        x2="64.5901"
        y2="41.6052"
        className={mainStroke}
      />
    </svg>
  )
}
