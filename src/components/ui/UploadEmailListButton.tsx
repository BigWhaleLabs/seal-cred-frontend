import { TextButton } from 'components/ui/Text'
import EmailFormStore from 'stores/EmailFormStore'
import ToolTip from 'components/ui/ToolTip'
import handleFile from 'helpers/handleFile'

export default function ({
  center,
  disabled,
  small,
  title = 'Upload an email list (txt, csv, etc...)',
}: {
  title?: string
  small?: boolean
  center?: boolean
  disabled?: boolean
}) {
  return (
    <TextButton
      center={center}
      disabled={disabled}
      small={small}
      onClick={() =>
        !disabled &&
        handleFile(EmailFormStore.setEmailListFromFile.bind(EmailFormStore))
      }
    >
      <ToolTip
        fitContainer
        disabled={disabled}
        position="bottom"
        text="Emails in your file should be separated somehow. Invalid emails will be ignored"
      >
        {title}
      </ToolTip>
    </TextButton>
  )
}
