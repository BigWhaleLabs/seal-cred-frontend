import { LinkText, SubSecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Token from 'models/Token'

const dosuAccessLink = classnames(
  'flex',
  'flex-col',
  'flex-wrap',
  'md:flex-row',
  'justify-center',
  'w-full',
  'space-y-4',
  'md:space-x-10',
  'md:space-y-0',
  'mt-6'
)

export default function DosuLink({ tokens }: { tokens: Token[] }) {
  const usedTokens = new Set(tokens.map((t) => t.template))
  if (!usedTokens.has('DosuHandle') || !usedTokens.has('Dosu1wave')) return null
  return (
    <div className={dosuAccessLink}>
      <SubSecondaryText>
        You're all set to use Dosu!{' '}
        <LinkText href="https://dosu.io/">Go back to Dosu</LinkText>
      </SubSecondaryText>
    </div>
  )
}
