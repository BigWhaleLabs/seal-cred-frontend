import { BadgeText, BoldColoredText, SubheaderText } from 'components/Text'
import { BigNumber } from 'ethers'
import { Suspense, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import BadgeIcon from 'icons/BadgeIcon'
import Button from 'components/Button'
import CheckPassed from 'icons/CheckPassed'
import ProofStore from 'stores/ProofStore'
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
import shortenedAddress from 'helpers/shortenedAddress'
import streetCred from 'helpers/streetCred'

const badgeWrapper = (minted?: boolean) =>
  classnames(
    display('flex'),
    flexDirection(minted ? 'flex-row' : 'flex-col', 'md:flex-col'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-blue-700' : 'bg-blue-800'),
    padding('px-4', 'py-4'),
    space(
      minted ? 'space-x-2' : 'space-y-2',
      minted ? 'md:space-x-0' : undefined,
      'md:space-y-2'
    )
  )

const badgeBody = (minted?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    space('space-y-2'),
    textAlign(!minted ? 'text-center' : 'text-left'),
    justifyContent(
      minted ? 'justify-start' : 'justify-center',
      'sm:justify-center'
    )
  )

const mintPassed = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-start', 'md:justify-center'),
  flexDirection('flex-row'),
  space('space-x-2')
)

function Badge({
  address,
  originalAddress,
}: {
  address: string
  originalAddress?: string
}) {
  const { contractNames, ledger } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  const [loading, setLoading] = useState(false)

  return (
    <div className={badgeWrapper(!!originalAddress)}>
      {originalAddress ? (
        <BadgeIcon />
      ) : (
        <img src="/img/qr.png" alt="Scan to view a badge" />
      )}
      <div className={badgeBody(!!originalAddress)}>
        <BadgeText>
          {contractNames[address]
            ? `${contractNames[address]} (${shortenedAddress(address)})`
            : `Contract: ${shortenedAddress(address)}`}
        </BadgeText>
        {originalAddress ? (
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
            <BoldColoredText color="pink">Minted</BoldColoredText>
            <CheckPassed color="pink" />
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
  const shortAddress = shortenedAddress(address, 5)

  return (
    <Suspense fallback={<SubheaderText>{shortAddress}...</SubheaderText>}>
      <Badge address={address} originalAddress={originalAddress} />
    </Suspense>
  )
}

export default BadgeBlock
