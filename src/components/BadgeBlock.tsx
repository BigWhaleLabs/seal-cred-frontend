import { BadgeText, BoldColoredText } from 'components/Text'
import { FC } from 'react'
import BadgeIcon from 'icons/BadgeIcon'
import Button from 'components/Button'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  textAlign,
} from 'classnames/tailwind'

const mintWrapper = (minted?: boolean) =>
  classnames(
    display('flex'),
    flexDirection(minted ? 'flex-row' : 'flex-col', 'md:flex-col'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-blue-700' : 'bg-blue-800'),
    padding('px-4', 'py-4'),
    space(
      minted ? 'space-x-2' : 'space-y-2',
      minted ? 'md:space-x-0' : undefined,
      'md:space-y-2'
    )
  )

const mintBody = (minted?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    space('space-y-2'),
    textAlign(!minted ? 'text-center' : 'text-left'),
    justifyContent(
      minted ? 'justify-start' : 'justify-center',
      'sm:justify-center'
    )
  )

const mintedPassed = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-start', 'md:justify-center'),
  flexDirection('flex-row'),
  space('space-x-2')
)

const MintedPassed = () => {
  return (
    <div className={mintedPassed}>
      <BoldColoredText color="pink">Minted</BoldColoredText>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="9" fill="#FF7BED" />
        <path
          d="M5 9L8 12L13 7"
          stroke="#4B61D5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  )
}

const BadgeBlock: FC<{ name: string; minted?: boolean }> = ({
  name,
  minted,
}) => {
  return (
    <div className={mintWrapper(minted)}>
      {minted ? (
        <img src="/img/qr.png" alt="Scan to view a badge" />
      ) : (
        <BadgeIcon />
      )}
      <div className={mintBody(minted)}>
        <BadgeText>{name}</BadgeText>
        {minted ? (
          <MintedPassed />
        ) : (
          <Button small colors="primary">
            Mint badge
          </Button>
        )}
      </div>
    </div>
  )
}

export default BadgeBlock
