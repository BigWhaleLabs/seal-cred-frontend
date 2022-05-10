import { BadgeText, BoldColoredText, SubheaderText } from 'components/Text'
import { BigNumber } from 'ethers'
import { Suspense, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import BadgeIcon from 'icons/BadgeIcon'
import Button from 'components/Button'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ProofStore from 'stores/ProofStore'
import QRCode from 'components/QRCode'
import QRLoading from 'icons/QRLoading'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  textAlign,
} from 'classnames/tailwind'
import streetCred from 'helpers/streetCred'
import truncateMiddle from 'helpers/truncateMiddle'

const badgeWrapper = (minted?: boolean) =>
  classnames(
    display('flex'),
    flexDirection(minted ? 'flex-row' : 'flex-col', 'lg:flex-col'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-blue-700' : 'bg-blue-800'),
    padding('px-4', 'py-4'),
    space(
      minted ? 'space-x-2' : 'space-y-2',
      minted ? 'lg:space-x-0' : undefined,
      'lg:space-y-2'
    )
  )

const badgeBody = (minted?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    space('space-y-2'),
    textAlign(minted ? 'text-left' : 'text-center', 'lg:text-center'),
    alignItems(minted ? 'items-start' : 'items-center', 'lg:items-center'),
    justifyContent(
      minted ? 'justify-start' : 'justify-center',
      'lg:justify-center'
    )
  )

const mintPassed = classnames(
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  justifyContent('justify-start', 'lg:justify-center'),
  flexDirection('flex-row'),
  space('space-x-2')
)

function Badge({
  derivativeAddress,
  originalAddress,
}: {
  derivativeAddress: string
  originalAddress?: string
}) {
  const { derivativeTokenIds, ledger } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  const [loading, setLoading] = useState(false)

  const unminted = !!originalAddress

  return (
    <div className={badgeWrapper(!unminted)}>
      {originalAddress ? (
        <BadgeIcon color="pink" />
      ) : derivativeTokenIds[derivativeAddress] ? (
        <QRCode
          derivativeAddress={derivativeAddress}
          tokenId={derivativeTokenIds[derivativeAddress][0]}
        />
      ) : (
        <QRLoading />
      )}
      <div className={badgeBody(!unminted)}>
        <BadgeText>
          <ContractName address={derivativeAddress} />
        </BadgeText>
        {unminted ? (
          <Button
            small
            colors="primary"
            loading={!!loading}
            onClick={async () => {
              setLoading(true)
              try {
                if (!account) throw new Error('No account found')
                const derivativeContractAddress =
                  ledger[originalAddress].derivativeContract.address
                const proof = proofsCompleted.find(
                  (proof) => proof.contract === originalAddress
                )
                if (!proof || !proof.result) throw new Error('No proof found')
                const ledgerMerkleTree = await streetCred.getRoot(
                  originalAddress
                )
                if (
                  !BigNumber.from(ledgerMerkleTree).eq(
                    BigNumber.from(proof.result.publicSignals[1])
                  )
                ) {
                  const index = ProofStore.proofsInProgress.indexOf(proof)
                  if (index > -1) ProofStore.proofsInProgress.splice(index, 1)

                  throw new Error(
                    'This proof is outdated, please, generate a new one'
                  )
                }
                await WalletStore.mintDerivative(
                  derivativeContractAddress,
                  proof.result
                )
                await StreetCredStore.refreshDerivativeContracts(account)
              } catch (error) {
                handleError(error)
              } finally {
                setLoading(false)
              }
            }}
          >
            Mint badge
          </Button>
        ) : (
          <div className={mintPassed}>
            <BoldColoredText color="text-pink">Minted</BoldColoredText>
            <Complete color="pink" />
          </div>
        )}
      </div>
    </div>
  )
}

function BadgeBlock({
  address,
  originalAddress,
}: {
  address: string
  originalAddress?: string
}) {
  const shortAddress = truncateMiddle(address)

  return (
    <Suspense fallback={<SubheaderText>{shortAddress}...</SubheaderText>}>
      <Badge derivativeAddress={address} originalAddress={originalAddress} />
    </Suspense>
  )
}

export default BadgeBlock
