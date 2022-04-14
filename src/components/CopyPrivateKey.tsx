import CopyWallet from 'components/CopyWallet'
import PublicAccountStore from 'stores/PublicAccountStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  cursor,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  justifyContent,
  padding,
  textAlign,
  textColor,
  transitionProperty,
  width,
  wordBreak,
} from 'classnames/tailwind'
import copy from 'copy-to-clipboard'

const privatekeyBackground = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-between'),
  transitionProperty('transition-colors'),
  borderRadius('rounded-full'),
  backgroundColor('bg-accent-light'),
  textAlign('text-center'),
  wordBreak('break-all'),
  padding('py-3', 'px-4', 'md:py-4', 'md:px-6'),
  cursor('cursor-pointer'),
  textColor('text-primary'),
  alignItems('items-center'),
  width('w-fit')
)

const privatekeyText = classnames(
  padding('pr-4'),
  fontWeight('font-bold'),
  fontSize('text-lg')
)

export default function CopyPrivateKey() {
  if (!PublicAccountStore.privateKey) {
    return null
  }

  function onCopy() {
    copy(PublicAccountStore.privateKey ?? '')
  }

  return (
    <div className={privatekeyBackground} onClick={onCopy}>
      <span className={privatekeyText}>••••••••</span>
      <CopyWallet />
    </div>
  )
}
