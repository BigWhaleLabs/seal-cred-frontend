import { FC } from 'react'
import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useParams } from 'react-router-dom'
import BadgeList from 'components/BadgeList'
import CardBlock from 'components/CardBlock'
import EthereumBlock from 'components/EthereumBlock'
import useTokens from 'helpers/useTokens'

const Public: FC = () => {
  const { address } = useParams<{ address: string }>()
  const { tokens } = useTokens(address)

  return (
    <>
      <div className={classnames('py-5')}>
        <CardBlock border shadow main>
          <HeaderText>One identity to rule them all</HeaderText>
          <EthereumBlock address={address} />
          <BadgeList tokens={tokens} />
        </CardBlock>
      </div>
    </>
  )
}

export default Public
