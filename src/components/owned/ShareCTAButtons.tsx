import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Button from 'components/Button'
import LinkChain from 'icons/LinkChain'
import Network from 'models/Network'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
  space,
  textColor,
} from 'classnames/tailwind'
import getContractName from 'helpers/getContractName'
import prettifyContractName from 'helpers/prettifyContractName'

const buttonContentWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-3'),
  textColor('text-inherit'),
  alignItems('items-center')
)

const buttonWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-3'),
  margin('my-4')
)

async function copy(pathname: string) {
  await navigator.clipboard.writeText('sealcred.xyz' + pathname)
}

export default function ({
  address,
  network,
}: {
  address: string
  network: Network
}) {
  const { pathname } = useLocation()

  let contractName = getContractName(address, network)

  if (contractName) {
    contractName = prettifyContractName(contractName)
  }

  let text = `I minted a ZK badge for ${contractName} using @SealCred. Check it out 🦭 ${window.location}`
  if (!contractName || text.length - String(window.location).length > 280) {
    text = `I minted a ZK badge using @SealCred. Check it out 🦭 ${window.location}`
  }

  return (
    <div className={buttonWrapper}>
      <Button
        gradientFont
        type="secondary"
        small
        url={`http://twitter.com/share?url=${encodeURIComponent(text)}`}
      >
        <div className={buttonContentWrapper}>
          <div className="text-white">
            <Twitter />
          </div>
          Tweet
        </div>
      </Button>
      <Button
        gradientFont
        type="secondary"
        small
        onClick={async () => {
          await copy(pathname)
          toast('Link copied 👍')
        }}
      >
        <div className={buttonContentWrapper}>
          <div className="text-white">
            <LinkChain />
          </div>
          Copy link
        </div>
      </Button>
    </div>
  )
}
