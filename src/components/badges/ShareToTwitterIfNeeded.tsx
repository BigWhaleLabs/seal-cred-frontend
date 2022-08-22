import { BodyText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractsStore from 'stores/ContractsStore'
import Cross from 'icons/Cross'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import NotificationsStore from 'stores/NotificationsStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gridColumn,
  padding,
  space,
  width,
} from 'classnames/tailwind'
import getContractName from 'helpers/network/getContractName'
import getShareToTwitterLink from 'helpers/getShareToTwitterLink'
import prettifyContractName from 'helpers/network/prettifyContractName'
import useContractTokens from 'hooks/useContractTokens'

const wideBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-1'),
  alignItems('items-center'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-primary-dimmed'),
  padding('lg:px-6', 'px-4', 'py-4'),
  gridColumn('lg:col-span-2', 'col-span-1')
)

interface ShareToTwitterProps {
  derivativeAddress: string
  network: Network
}

function ShareToTwitterIfNeededSuespended({
  derivativeAddress,
  network,
}: ShareToTwitterProps) {
  const { showTwitterShare } = useSnapshot(NotificationsStore)
  const tokenIds = useContractTokens(
    derivativeAddress,
    ContractsStore.networks[network]
  )

  const tokenId = tokenIds[0]

  if (!showTwitterShare) return null

  const closeNotification = () => (NotificationsStore.showTwitterShare = false)

  let contractName = getContractName(derivativeAddress, network)

  if (contractName) {
    contractName = prettifyContractName(contractName)
  }

  const url = `${window.location.origin}/${derivativeAddress}/${tokenId}`

  let text = `I minted a ZK badge for ${contractName} using @SealCred. Check it out 🦭 ${url}`
  if (!contractName || text.length - String(window.location).length > 280) {
    text = `I minted a ZK badge using @SealCred. Check it out 🦭 ${url}`
  }
  if (!tokenId) {
    text =
      'Create zero knowledge proof and build your pseudonymous wallet with SealCred 🦭 sealcred.xyz'
  }

  return (
    <div className={wideBlock}>
      <BodyText bold fontPrimary>
        You minted your first badge!
      </BodyText>
      <ExternalLink url={getShareToTwitterLink({ text })}>
        <Button type="secondary" onClick={closeNotification} small>
          <div className={width('tiny:w-max')}>Share a Tweet</div>
        </Button>
      </ExternalLink>
      <button onClick={closeNotification}>
        <Cross />
      </button>
    </div>
  )
}

export default function ({ derivativeAddress, network }: ShareToTwitterProps) {
  return (
    <Suspense fallback={<>Fetching contract ids...</>}>
      <ShareToTwitterIfNeededSuespended
        derivativeAddress={derivativeAddress}
        network={network}
      />
    </Suspense>
  )
}
