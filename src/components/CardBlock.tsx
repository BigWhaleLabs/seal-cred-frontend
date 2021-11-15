import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'
import AppStore, { Theme } from 'stores/AppStore'
import Identity, { Identities } from 'components/Identity'

interface ICardBlock {
  title?: Identities
  shadow?: boolean
  border?: boolean
  main?: boolean
  tiny?: boolean
}

const cardContainer = (props: ICardBlock, theme: Theme) =>
  classnames(
    'flex',
    'flex-col',
    'rounded-block',
    'max-w-sm',
    'mx-auto',
    'md:max-w-full',
    'md:mx-0',
    'transition-colors',
    theme === 'dark' ? 'bg-semi-background' : 'bg-background',
    props.tiny ? cardTiny : 'w-full',
    props.shadow ? cardShadow : undefined,
    props.border ? (theme === 'light' ? cardBorder : undefined) : undefined,
    props.main ? cardPaddingMain : cardPaddingDefault
  )
const cardTiny = classnames('w-full', 'md:w-5/6')
const cardShadow = classnames('shadow')
const cardBorder = classnames('border-2')
const cardPaddingMain = classnames('py-8', 'px-4', 'md:py-10', 'md:px-16')
const cardPaddingDefault = classnames('py-6', 'px-4', 'md:p-4')

const CardBlock: FC<ICardBlock> = ({
  title,
  shadow,
  border,
  main,
  tiny,
  children,
}) => {
  const theme = AppStore.theme

  return (
    <div className={cardContainer({ shadow, border, main, tiny }, theme)}>
      {title ? <Identity emphasis name={title} /> : null}
      {children}
    </div>
  )
}

export default observer(CardBlock)
