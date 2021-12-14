import { BodyText, LargerText } from 'components/Text'
import { FC, useState } from 'react'
import { classnames } from 'classnames/tailwind'
import Button from 'components/Button'
import Card from 'components/Card'

interface EthereumIdentityToVerifyProps {
  address: string
}

const breakWords = classnames('break-words')

const EthereumIdentityToVerify: FC<EthereumIdentityToVerifyProps> = ({
  address,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <Card>
      <BodyText>Ethereum</BodyText>
      <div className={breakWords}>
        <LargerText>{address}</LargerText>
      </div>
      <Button
        loading={loading}
        type="primary"
        onClick={() => {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }}
      >
        Verify
      </Button>
    </Card>
  )
}

export default EthereumIdentityToVerify
