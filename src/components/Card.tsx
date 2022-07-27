import {
  alignItems,
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
  mobileSpinnerOnRight?: boolean
  paddingType?: 'small' | 'normal'
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
  alignItems('items-stretch'),
  minHeight('sm:min-h-card', 'min-h-fit')
)

const cardContainer = (
  shadow?: boolean,
  color?: Color,
  onlyWrap = false,
  thin = false,
  nospace?: boolean,
  useAppStyles?: boolean,
  paddingType?: 'small' | 'normal'
) => {
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
    width(
      thin ? 'sm:!w-thin-card' : 'sm:w-card',
      thin ? 'tiny:w-thin-mobile' : 'w-mobile-card',
      { 'w-32': thin }
    ),
    margin({ 'mx-auto': !thin }, 'lg:mx-0'),
    maxHeight({ 'sm:max-h-card': !onlyWrap, 'max-h-mobile-card': !onlyWrap }),
    space({ 'space-y-6': !nospace }),
    wordBreak('break-words'),
    zIndex('z-30'),
    useAppStyles ? appStyles : undefined
  )
}
const spinnerBoxPosition = inset('-top-24', 'md:-top-28', 'md:-right-40')
const spinnerBox = (mobileSpinnerOnRight?: boolean) => {
  return classnames(
    position('absolute'),
    mobileSpinnerOnRight ? inset('-right-28') : inset('-right-4'),
    spinnerBoxPosition
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
  mobileSpinnerOnRight,
}: ChildrenProp & CardProps) {
  return (
    <CardContext.Provider value={{ cardColor: color }}>
      <div
        className={cardContainer(
          shadow,
          color,
          onlyWrap,
          thin,
          nospace,
          useAppStyles,
          paddingType
        )}
      >
        {children}
        {!!spinner && (
          <div className={spinnerBox(mobileSpinnerOnRight)}>
            <ArcText text={spinner} />
          </div>
        )}
      </div>
    </CardContext.Provider>
  )
}
