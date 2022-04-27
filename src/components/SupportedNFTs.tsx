import { AccentText, BadgeText } from 'components/Text'
import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import { FC, Suspense, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, { display, justifyContent } from 'classnames/tailwind'

const tokenCard = classnames(display('flex'), justifyContent('justify-between'))

const Token: FC<{ token: { name: ERC721['name']; address: string } }> = ({
  token,
}) => {
  const [contractName, setContractName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchContractName() {
      try {
        const contractName = await token.name()
        setContractName(
          contractName.length ? contractName : `Contract: ${token.address}`
        )
      } catch (error) {
        console.error(error)
      }
    }

    void fetchContractName()
  }, [token])

  return (
    <>
      {contractName && (
        <Card>
          <div className={tokenCard}>
            <BadgeText>{contractName}</BadgeText>
            <Button
              badge
              color="success"
              disabled={loading}
              onClick={() => {
                setLoading(true)
                try {
                  console.log('Mint token', token.address)
                  // generate proof
                  // const tx = await contract.functions.mint()
                  // await tx.wait()
                } catch (e) {
                  console.error(e)
                } finally {
                  setLoading(false)
                }
              }}
            >
              mint
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}

function TokenList() {
  const { originalOwnedTokens } = useSnapshot(StreetCredStore)

  return (
    <>
      {!!originalOwnedTokens.length &&
        originalOwnedTokens.map((contract, index) => {
          const { name, address } = contract
          return <Token key={index} token={{ name, address }} />
        })}
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
