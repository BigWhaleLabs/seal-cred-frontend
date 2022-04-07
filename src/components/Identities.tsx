import {
  classnames,
  display,
  gap,
  gridTemplateColumns,
  margin,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AddIdentity from 'components/AddIdentity'
import EthStore from 'stores/EthStore'
import EthereumIdentity from 'components/EthereumIdentity'

const container = classnames(
  display('grid'),
  gridTemplateColumns('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3'),
  gap('gap-4'),
  margin('mb-4')
)

export default function Identities() {
  const { accounts } = useSnapshot(EthStore)

  return (
    <div className={container}>
      <AddIdentity />
      {accounts.length > 0 && <EthereumIdentity />}
    </div>
  )
}
