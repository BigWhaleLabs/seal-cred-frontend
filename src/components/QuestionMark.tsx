import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  width,
} from 'classnames/tailwind'

const questionStyles = (small?: boolean) =>
  classnames(
    width(small ? 'w-5' : 'w-6'),
    height(small ? 'h-5' : 'h-6'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-current'),
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize(small ? 'text-xs' : 'text-base'),
    fontFamily('font-primary'),
    cursor('cursor-pointer')
  )

export default function ({ small }: { small?: boolean }) {
  return <div className={questionStyles(small)}>?</div>
}
