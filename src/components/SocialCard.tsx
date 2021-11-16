import { SecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useState } from 'react'
import CardBlock from 'components/CardBlock'
import Identity, { Identities } from 'components/Identity'
import TextField from 'components/TextField'

const clickedIdentity = (name: string) => {
  console.log(`Clecked by ${name} identity`)
}

const SocialCard = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <CardBlock border tiny>
      <TextField
        placeholder="Search"
        value={searchValue}
        onTextChange={(e) => setSearchValue(e)}
        onEnter={(e) => setSearchValue(e)}
      />
      <div className={classnames('pt-4')}>
        <SecondaryText>Link identity</SecondaryText>
        <Identity
          name={Identities.eth}
          onClick={() => clickedIdentity(Identities.eth)}
        />
        <Identity
          name={Identities.twitter}
          onClick={() => clickedIdentity(Identities.twitter)}
        />
        <Identity
          name={Identities.rarible}
          onClick={() => clickedIdentity(Identities.rarible)}
        />
      </div>
    </CardBlock>
  )
}

export default SocialCard
