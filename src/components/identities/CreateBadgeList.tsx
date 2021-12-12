import { Group } from 'components/Section'
import CreateNFTBadge from 'components/identities/CreateNFTBadge'
import Template from 'models/Template'

export default function CreateBadgeList({
  templates,
  onCreate,
}: {
  templates: Template[]
  onCreate: (type: string) => void
}) {
  if (templates.length === 0) return null
  return (
    <Group title="NFT badges you can create">
      {templates.map((template) => (
        <CreateNFTBadge
          key={template.type}
          template={template}
          onCreate={onCreate}
        />
      ))}
    </Group>
  )
}
