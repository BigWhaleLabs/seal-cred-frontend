import { useMemo } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import BaseBadgeContract from 'helpers/BaseBadgeContract'
import ERC721BadgeContract from 'helpers/ERC721BadgeContract'
import EmailBadgeContract from 'helpers/EmailBadgeContract'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { emailLedger, ERC721Ledger } = useSnapshot(SealCredStore)

  return useMemo(() => {
    let result: { [address: string]: BaseBadgeContract } = {}

    result = Object.values(emailLedger).reduce(
      (result, { derivativeContract, domain }) => ({
        ...result,
        [derivativeContract.address]: new EmailBadgeContract(
          derivativeContract.address,
          domain
        ),
      }),
      result
    )

    return Object.values(ERC721Ledger).reduce(
      (result, { derivativeContract, originalContract }) => ({
        ...result,
        [derivativeContract.address]: new ERC721BadgeContract(
          derivativeContract.address,
          originalContract.address
        ),
      }),
      result
    )
  }, [emailLedger, ERC721Ledger])
}