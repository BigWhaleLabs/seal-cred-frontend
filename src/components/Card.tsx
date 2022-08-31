import {
  backgroundColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  display,
  flexDirection,
  inset,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  padding,
  position,
  space,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ArcText from 'icons/ArcText'
import CardContext from 'components/CardContext'
import ChildrenProp from 'models/ChildrenProp'
import Color from 'models/Color'
import colorToBorderColor from 'helpers/colors/colorToBorderColor'

interface CardProps {
  shadow?: boolean
  color: Color
  onlyWrap?: boolean
  spinner?: string
  thin?: boolean
  small?: boolean
  nospace?: boolean
  useAppStyles?: boolean
  noArcTextSpace?: boolean
  mobileSpinnerOnRight?: boolean
  paddingType?: 'small' | 'normal'
  higherZIndex?: boolean
}

const cardColor = (color?: Color) => {
  return classnames(
    borderWidth('border'),
    colorToBorderColor(color || 'primary-dark'),
    boxShadow('shadow-2xl'),
    boxShadowColor(
      color === 'accent'
        ? 'shadow-accent-semi-transparent'
        : color === 'tertiary'
        ? 'shadow-tertiary-semi-transparent'
        : color === 'secondary'
        ? 'shadow-secondary-semi-transparent'
        : color === 'formal-accent'
        ? 'shadow-formal-accent-semi-transparent'
        : color === 'primary'
        ? 'shadow-primary-semi-transparent'
        : undefined
    )
  )
}

const appStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-fit', 'tablet:min-h-card'),
  maxHeight('max-h-mobile-card', 'xxs:max-h-app-card'),
  width('w-screen-93', 'tablet:w-screen-45'),
  maxWidth('tablet:max-w-app-card')
)

const thinWidthStyles = width('sm:!w-thin-card', 'xxs:w-5/12', 'w-30')

const defaultWidthStyles = width('sm:w-card', 'w-mobile-card')

const cardContainer = ({
  shadow,
  color,
  onlyWrap = false,
  thin = false,
  nospace,
  useAppStyles,
  paddingType,
  spinner,
  higherZIndex,
}: CardProps) => {
  const defaultSpacing = !onlyWrap && !useAppStyles

  return classnames(
    position('relative'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-primary-dark'),
    cardColor(shadow ? color : undefined),
    padding({
      'px-small': paddingType === 'small',
      'py-small': paddingType === 'small',
      'px-5': paddingType !== 'small',
      'py-5': paddingType === 'normal',
      'py-8': typeof paddingType === 'undefined',
    }),
    useAppStyles ? appStyles : thin ? thinWidthStyles : defaultWidthStyles,
    margin({ 'mx-auto': !thin }, 'lg:mx-0'),
    maxHeight({
      'sm:max-h-card': defaultSpacing,
      'max-h-mobile-card': defaultSpacing,
    }),
    space({ 'space-y-6': !nospace }),
    margin({ 'mt-4': !!spinner }),
    wordBreak('break-words'),
    zIndex(higherZIndex ? 'z-40' : 'z-30')
  )
}
const spinnerBox = (
  mobileSpinnerOnRight?: boolean,
  noArcTextSpace?: boolean
) => {
  return classnames(
    position('absolute'),
    margin({ '!mt-0': noArcTextSpace }),
    inset(
      noArcTextSpace ? '-top-32' : '-top-24',
      mobileSpinnerOnRight ? '-right-28' : '-right-4',
      'tablet:-top-28',
      'tablet:-right-40'
    )
  )
}
export default function ({
  color,
  shadow,
  onlyWrap,
  spinner,
  thin,
  children,
  paddingType,
  nospace,
  useAppStyles,
  noArcTextSpace,
  mobileSpinnerOnRight,
  higherZIndex,
}: ChildrenProp & CardProps) {
  return (
    <CardContext.Provider value={{ cardColor: color }}>
      <div
        className={cardContainer({
          shadow,
          color,
          onlyWrap,
          thin,
          nospace,
          useAppStyles,
          paddingType,
          spinner,
          higherZIndex,
        })}
      >
        {children}
        {!!spinner && (
          <div className={spinnerBox(mobileSpinnerOnRight, noArcTextSpace)}>
            <ArcText text={spinner} />
          </div>
        )}
      </div>
    </CardContext.Provider>
  )
}
