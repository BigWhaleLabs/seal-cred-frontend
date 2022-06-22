import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  fill,
  height,
  justifyContent,
  width,
} from 'classnames/tailwind'

const questionStyles = classnames(
  fill('fill-accent'),
  width('w-6'),
  height('h-6'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-accent'),
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

export default function () {
  return <div className={questionStyles}>?</div>
}
