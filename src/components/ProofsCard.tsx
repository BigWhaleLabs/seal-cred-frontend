import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import Initial from 'components/Initial'
import ProofListCard from 'components/ProofListCard'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, { alignContent } from 'classnames/tailwind'

const cardAndZKProofContainer = classnames(alignContent('content-center'))

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)

  return (
    <div className={cardAndZKProofContainer}>
      <Card color="yellow" shadow>
        {account ? <ProofListCard /> : <Initial />}
      </Card>
      <ZkProofButton />
    </div>
  )
}

export default ProofsCard
