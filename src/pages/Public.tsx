import { FC } from 'react'
import { HeaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useParams } from 'react-router-dom'
import CardBlock from 'components/Card'
import EthereumBlock from 'components/EthereumBlock'

const Public: FC = () => {
  const { address } = useParams<{ address: string }>()

  return (
    <>
      <div className={classnames('py-5')}>
        <CardBlock border shadow main>
          <HeaderText>One identity to rule them all</HeaderText>
          <EthereumBlock address={address} />
        </CardBlock>
      </div>
    </>
  )
}

export default Public
