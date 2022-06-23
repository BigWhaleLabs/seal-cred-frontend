import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { erc721Ledger, workLedger } = useSnapshot(SealCredStore)

  return proofsCompleted.filter((proof) => {
    if (proof instanceof EmailProof) {
      return (
        !workLedger[proof.domain] ||
        !contractsOwned.includes(
          workLedger[proof.domain].derivativeContract.address
        )
      )
    }
    if (proof instanceof ERC721Proof) {
      return (
        !erc721Ledger[proof.contract] ||
        !contractsOwned.includes(
          erc721Ledger[proof.contract].derivativeContract.address
        )
      )
    }
    return false
  })
}
