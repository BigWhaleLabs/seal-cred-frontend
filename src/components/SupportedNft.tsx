import { AccentText } from 'components/Text'
import { SCERC721Derivative } from '@big-whale-labs/street-cred-ledger-contract'
import { Suspense, useEffect, useState } from 'react'
import {
  checkContractBalance,
  getDerivativesContracts,
} from 'helpers/fetchTokens'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

function SupportedNft() {
  const { originalOwnedTokens } = useSnapshot(StreetCredStore)

  return (
    <>
      {originalOwnedTokens.map((token, index) => (
        <Card key={index}>{token}</Card>
      ))}
    </>
  )
}

export function DerivativesCanMint() {
  const { account } = useSnapshot(WalletStore)
  const [loading, setLoading] = useState(false)
  const [derivatives, setDerivatives] = useState<SCERC721Derivative[]>([])

  useEffect(() => {
    async function fetchDerivatives() {
      setDerivatives(await getDerivativesContracts())
    }

    void fetchDerivatives
  }, [])

  return (
    <>
      {account &&
        derivatives.map(async (contract, index) =>
          (await checkContractBalance(account, contract)) ? (
            <Card key={index}>
              {await contract.name()}
              <button
                title="mint"
                disabled={loading}
                onClick={() => {
                  setLoading(true)
                  try {
                    // generate proof
                    // const tx = await contract.functions.mint()
                    // await tx.wait()
                  } catch (e) {
                    handleError(e)
                  } finally {
                    setLoading(false)
                  }
                }}
              />
            </Card>
          ) : undefined
        )}
    </>
  )
}

export function SupportedNftWrapper() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    StreetCredStore.requestOriginalContracts(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching avaliable tokens ...</AccentText>}>
      <SupportedNft />
    </Suspense>
  )
}
