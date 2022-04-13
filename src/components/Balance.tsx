import { Account } from 'stores/PublicAccountStore'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import PublicAccountStore from 'stores/PublicAccountStore'

export default function Balance({ account }: { account: Account }) {
  const { blockId, getBalance } = useSnapshot(PublicAccountStore)
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    async function updateBalance() {
      const balance = await getBalance(account)
      setBalance(balance ?? '0')
    }

    void updateBalance()
  }, [blockId, account, getBalance])

  return <>{balance ? ` · ${balance} ETH` : <Loading small />}</>
}
