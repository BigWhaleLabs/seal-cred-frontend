import { TextButton } from 'components/ui/Text'
import EmailFormStore from 'stores/EmailFormStore'
import ToolTip from 'components/ui/ToolTip'
import handleFile from 'helpers/handleFile'

export default function ({
  title = 'Upload an email list (txt, csv, etc...)',
  small,
  center,
}: {
  title?: string
  small?: boolean
  center?: boolean
}) {
  return (
    <TextButton
      onClick={() =>
        handleFile(EmailFormStore.setEmailListFromFile.bind(EmailFormStore))
      }
      disabled={true}
      small={small}
      center={center}
    >
      <ToolTip
        position="bottom"
        text="Emails in your file should be separated somehow. Invalid emails will be ignored"
        fitContainer
      >
        {title}
      </ToolTip>
    </TextButton>
  )
}
