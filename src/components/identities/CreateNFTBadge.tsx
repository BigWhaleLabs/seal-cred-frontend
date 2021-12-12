import { RegularText } from 'components/Text'
import { Section } from 'components/Section'
import BadgeButton from 'components/identities/BadgeButton'
import Template from 'models/Template'

export default function CreateNFTBadge({
  template: { name, type },
  onCreate,
}: {
  onCreate: (type: string) => void
  template: Template
}) {
  function onClick() {
    onCreate(type)
  }
  return (
    <Section>
      <RegularText>{name}</RegularText>
      <BadgeButton onClick={onClick} />
    </Section>
  )
}
