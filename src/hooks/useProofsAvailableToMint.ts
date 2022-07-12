import { GoerliContractsStore } from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import useContractsOwned from 'hooks/useContractsOwned'

export default function () {
  const contractsOwned = useContractsOwned(GoerliContractsStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ERC721Ledger, externalERC721Ledger, emailLedger } =
    useSnapshot(SealCredStore)

  return proofsCompleted.filter((proof) => {
    if (proof instanceof EmailProof) {
      return (
        !emailLedger[proof.domain] ||
        !contractsOwned.includes(emailLedger[proof.domain].derivativeContract)
      )
    }
    if (proof instanceof ERC721Proof) {
      const hasDerivative =
        ERC721Ledger[proof.contract] &&
        contractsOwned.includes(ERC721Ledger[proof.contract].derivativeContract)

      const hasDerivativeInExternal =
        externalERC721Ledger[proof.contract] &&
        contractsOwned.includes(
          externalERC721Ledger[proof.contract].derivativeContract
        )

      return !hasDerivative || !hasDerivativeInExternal
    }
    return false
  })
}
