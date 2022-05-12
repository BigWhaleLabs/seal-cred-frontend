import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import useDerivativeTokensOwned from 'helpers/useDerivativeTokensOwned'

export default function () {
  const derivativeTokensOwned = useDerivativeTokensOwned()
  const { proofsCompleted } = useSnapshot(ProofStore)
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
    (proof) => !derivativeTokensOwnedMap[proof.contract]
  )
}
