import PublicAccountStore from 'stores/PublicAccountStore'
import classnames, {
  alignItems,
  backgroundColor,
  cursor,
  display,
  fontSize,
  fontWeight,
  justifyContent,
  padding,
  textColor,
} from 'classnames/tailwind'

const connectedPublicAccountContainer = classnames(
  padding('p-4'),
  backgroundColor('bg-gray-50'),
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  cursor('cursor-pointer')
)

const accountText = (isActive: boolean) =>
  classnames(
    fontSize('text-sm'),
    fontWeight('font-medium'),
    textColor(isActive ? 'text-accent' : 'text-gray-900')
  )

export default function ConnectedPublicAccount({
  account,
  children,
}: {
  account: string
  children?: React.ReactNode
}) {
  const isActive = PublicAccountStore.currentAccount === account
  function onClick() {
    if (!isActive) {
      PublicAccountStore.currentAccount = account
    }
  }

  return (
    <div className={connectedPublicAccountContainer} onClick={onClick}>
      <span className={accountText(isActive)}>
        {account.slice(0, 6)}...{account.slice(-6)}
      </span>
      {children}
    </div>
  )
}
