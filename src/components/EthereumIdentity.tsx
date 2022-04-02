import { BodyText } from 'components/Text'
import { classnames, wordBreak } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import EthStore from 'stores/EthStore'
import TokenList from 'components/TokenList'

const breakWords = classnames(wordBreak('break-words'))
const EthereumIdentity = () => {
  const ethStoreSnapshot = useSnapshot(EthStore)

  return (
    <Card>
      <BodyText>Ethereum</BodyText>
      <div className={breakWords}>
        <BodyText>{ethStoreSnapshot.accounts[0]}</BodyText>
      </div>
      <TokenList />
    </Card>
  )
}

export default EthereumIdentity
