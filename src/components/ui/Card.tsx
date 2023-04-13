import {
  backgroundColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  display,
  flexDirection,
  height,
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
import CardContext from 'components/ui/CardContext'
import ChildrenProp from 'models/ChildrenProp'
import Color from 'models/Color'
import colorToBorderColor from 'helpers/colors/colorToBorderColor'
import useBreakpoints from 'hooks/useBreakpoints'

interface CardProps {
  shadow?: boolean
  color: Color
  onlyWrap?: boolean
  spinner?: { text: string; avoidCardContent?: boolean }
  thin?: boolean
  small?: boolean
  nospace?: boolean
  useAppStyles?: boolean
  paddingType?: 'small' | 'normal'
  higherZIndex?: boolean
  wide?: boolean
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
  maxHeight('max-h-mobile-card', 'sm:max-h-app-card'),
  width('w-screen-93', 'md:w-3/4', 'tablet:!w-screen-45'),
  maxWidth('tablet:max-w-app-card')
)

const thinWidthStyles = width('sm:!w-thin-card', 'xxs:w-5/12', 'w-30')

const defaultWidthStyles = width('sm:w-card', 'w-mobile-card')
const wideWidthStyles = width('lg:w-screen-45', 'w-mobile-card')

const cardContainer = ({
  color,
  higherZIndex,
  nospace,
  onlyWrap = false,
  paddingType,
  shadow,
  spinner,
  thin = false,
  useAppStyles,
  wide,
}: CardProps) => {
  const defaultSpacing = !onlyWrap && !useAppStyles

  return classnames(
    position('relative'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-primary-dark'),
    cardColor(shadow ? color : undefined),
    padding({
      'px-5': paddingType !== 'small',
      'px-small': paddingType === 'small',
      'py-5': paddingType === 'normal',
      'py-8': typeof paddingType === 'undefined',
      'py-small': paddingType === 'small',
    }),
    useAppStyles
      ? appStyles
      : thin
      ? thinWidthStyles
      : wide
      ? wideWidthStyles
      : defaultWidthStyles,
    margin({ 'mx-auto': !thin }, 'lg:mx-0'),
    height('h-full'),
    maxHeight({
      'max-h-mobile-card': defaultSpacing,
      'sm:max-h-card': defaultSpacing,
    }),
    space({ 'space-y-6': !nospace }),
    margin({ 'mt-4': !!spinner }),
    wordBreak('break-words'),
    zIndex(higherZIndex ? 'z-40' : 'z-30')
  )
}
const spinnerBox = (avoidCardContent?: boolean) =>
  classnames(
    position('absolute'),
    inset(
      'right-8',
      avoidCardContent ? '-top-1/4' : '-top-1/6',
      'tablet:-right-29',
      'tablet:-top-1/10'
    )
  )

export default function ({
  children,
  color,
  higherZIndex,
  nospace,
  onlyWrap,
  paddingType,
  shadow,
  spinner,
  thin,
  useAppStyles,
  wide,
}: ChildrenProp & CardProps) {
  const { tablet } = useBreakpoints()

  return (
    <CardContext.Provider value={{ cardColor: color }}>
      <div
        className={cardContainer({
          color,
          higherZIndex,
          nospace,
          onlyWrap,
          paddingType,
          shadow,
          spinner,
          thin,
          useAppStyles,
          wide,
        })}
      >
        {children}
        {!!spinner && (
          <div className={spinnerBox(spinner.avoidCardContent)}>
            <ArcText diameter={tablet ? 200 : 100} text={spinner.text} />
          </div>
        )}
      </div>
    </CardContext.Provider>
  )
}
