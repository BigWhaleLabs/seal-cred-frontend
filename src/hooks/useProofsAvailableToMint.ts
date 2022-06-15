import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import useDerivativeTokensOwned from 'hooks/useDerivativeTokensOwned'

export default function () {
  const derivativeTokensOwned = useDerivativeTokensOwned()
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ledger } = useSnapshot(SealCredStore)
  const derivativeTokensOwnedMap = Object.entries(derivativeTokensOwned).reduce(
    (result, [contractAddress]) => ({
      ...result,
      [contractAddress]: true,
    }),
    {} as {
      [contractAddress: string]: boolean
    }
  )
  return proofsCompleted.filter(
    (proof) =>
      !ledger[proof.contract] ||
      !derivativeTokensOwnedMap[
        ledger[proof.contract].derivativeContract.address
      ]
  )
}
