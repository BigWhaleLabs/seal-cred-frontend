import PublicAccountStore, { Account } from 'stores/PublicAccountStore'
import Trash from 'components/Trash'
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
  width,
} from 'classnames/tailwind'

const connectedPublicAccountContainer = classnames(
  padding('p-4'),
  backgroundColor('bg-gray-50'),
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center')
)

const accountText = (isActive: boolean) =>
  classnames(
    fontSize('text-sm'),
    fontWeight('font-medium'),
    textColor(isActive ? 'text-accent' : 'text-gray-900'),
    cursor('cursor-pointer')
  )

const trashContainer = classnames(
  textColor('text-gray-600'),
  cursor('cursor-pointer')
)

const providerText = classnames(
  display('flex'),
  width('w-full'),
  textColor('text-gray-600'),
  cursor('cursor-pointer'),
  fontSize('text-xs')
)

export default function ConnectedPublicAccount({
  account,
}: {
  account: Account
}) {
  const isSelected =
    PublicAccountStore.currentAccount.address === account.address

  const isActive = PublicAccountStore.isActive(account)
  const hasPrivateKey = PublicAccountStore.hasPrivateKey(account)
  const { address, provider } = account

  function onClick() {
    if (!isSelected) {
      PublicAccountStore.currentAccount = account
    }
  }

  function onTrash() {
    void PublicAccountStore.removeAccount(account)
  }

  return (
    <div className={connectedPublicAccountContainer}>
      <span className={accountText(isSelected)} onClick={onClick}>
        {address.slice(0, 6)}...{address.slice(-6)}
        <span className={providerText}>{provider}</span>
      </span>
      {!hasPrivateKey && !isActive && (
        <span
          className={trashContainer}
          onClick={onTrash}
          title={PublicAccountStore.privateKey?.toString()}
        >
          <Trash />
        </span>
      )}
    </div>
  )
}
