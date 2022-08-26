import { AccentText } from 'components/Text'
import { displayFromSm, displayFromXsToSm } from 'helpers/visibilityClassnames'

export default function ({
  needNetworkChange,
}: {
  needNetworkChange?: boolean
}) {
  return (
    <>
      <span className={displayFromXsToSm}>
        <AccentText extraSmall color="text-primary-semi-dimmed">
          {needNetworkChange ? 'Change network' : 'No wallet'}
        </AccentText>
      </span>
      <span className={displayFromSm}>
        <AccentText color="text-primary-semi-dimmed">
          {needNetworkChange ? 'Change network' : 'No wallet connected'}
        </AccentText>
      </span>
    </>
  )
}
