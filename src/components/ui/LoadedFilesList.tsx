import ListedValue from 'components/ui/ListedValue'
import classnames, { display, flexWrap } from 'classnames/tailwind'

const wrapper = classnames(display('flex'), flexWrap('flex-wrap'))

export default function ({
  fileName,
  removeValueFromList,
}: {
  fileName: string
  removeValueFromList: (fileName: string, index?: number) => void
}) {
  return (
    <div className={wrapper}>
      <ListedValue
        title={fileName}
        fileName={fileName}
        removeValueFromList={removeValueFromList}
      />
    </div>
  )
}
