import { AccentText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

const Token: FC<{ name: ERC721['name'] }> = ({ name }) => {
  const [contractName, setContractName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchContractName() {
      try {
        setContractName(await name())
      } catch (error) {
        console.error(error)
      }
    }

    void fetchContractName()
  }, [name])

  return (
    <>
      {contractName && (
        <div>
          {contractName}
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
                console.error(e)
              } finally {
                setLoading(false)
              }
            }}
          />
        </div>
      )}
    </>
  )
}

function TokenList() {
  const { originalOwnedTokens } = useSnapshot(StreetCredStore)

  return (
    <>
      {!!originalOwnedTokens &&
        originalOwnedTokens.map((contract, index) => (
          <Card key={index}>{contract && <Token name={contract.name} />}</Card>
        ))}
    </>
  )
}

function SupportedNFTs() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    void StreetCredStore.refreshOriginalContracts(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching avaliable tokens...</AccentText>}>
      <TokenList />
    </Suspense>
  )
}

export default SupportedNFTs
