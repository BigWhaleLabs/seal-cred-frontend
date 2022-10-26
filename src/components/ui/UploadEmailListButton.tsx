import { TextButton } from 'components/ui/Text'
import EmailFormStore from 'stores/EmailFormStore'
import ToolTip from 'components/ui/ToolTip'
import handleFile from 'helpers/handleFile'

export default function ({
  title = 'Upload an email list (txt, csv, etc...)',
  small,
  center,
  disabled,
}: {
  title?: string
  small?: boolean
  center?: boolean
  disabled?: boolean
}) {
  return (
    <TextButton
      onClick={() =>
        !disabled &&
        handleFile(EmailFormStore.setEmailListFromFile.bind(EmailFormStore))
      }
      disabled={disabled}
      small={small}
      center={center}
    >
      <ToolTip
        position="bottom"
        text="Emails in your file should be separated somehow. Invalid emails will be ignored"
        disabled={disabled}
        fitContainer
      >
        {title}
      </ToolTip>
    </TextButton>
  )
}
