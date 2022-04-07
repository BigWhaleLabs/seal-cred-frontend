import PublicAccountStore from 'stores/PublicAccountStore'

export default function ConnectedPublicAccount({
  account,
  isActive = false,
  children,
}: {
  account: string
  isActive: boolean
  children?: React.ReactNode
}) {
  function onClick() {
    if (!isActive) {
      PublicAccountStore.currentAccount = account
    }
  }

  return (
    <div
      className={`p-2 bg-gray-50 ${!isActive ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <span className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
        <span className="flex items-center justify-center">
          <span
            className={`text-sm font-medium text-gray-900 ${
              isActive ? 'text-accent' : ''
            }`}
          >
            {account.slice(0, 6)}...{account.slice(-6)}
          </span>
          {children}
        </span>
      </span>
    </div>
  )
}
