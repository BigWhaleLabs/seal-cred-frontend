import { AccentText } from 'components/Text'
import { displayFromSm, displayFromXsToSm } from 'helpers/visibilityClassnames'
import ENSAddress from 'components/ENSAddress'
import Network from 'models/Network'

export default function ({ account }: { account: string }) {
  return (
    <>
      <span className={displayFromXsToSm}>
        <AccentText extraSmall color="text-accent">
          <ENSAddress address={account} network={Network.Goerli} />
        </AccentText>
      </span>
      <span className={displayFromSm}>
        <AccentText color="text-accent">
          <ENSAddress address={account} network={Network.Goerli} />
        </AccentText>
      </span>
    </>
  )
}
