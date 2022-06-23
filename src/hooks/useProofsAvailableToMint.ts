import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ERC721Ledger, emailLedger } = useSnapshot(SealCredStore)

  return proofsCompleted.filter((proof) => {
    if (proof instanceof EmailProof) {
      return (
        !emailLedger[proof.domain] ||
        !contractsOwned.includes(
          emailLedger[proof.domain].derivativeContract.address
        )
      )
    }
    if (proof instanceof ERC721Proof) {
      return (
        !ERC721Ledger[proof.contract] ||
        !contractsOwned.includes(
          ERC721Ledger[proof.contract].derivativeContract.address
        )
      )
    }
    return false
  })
}
