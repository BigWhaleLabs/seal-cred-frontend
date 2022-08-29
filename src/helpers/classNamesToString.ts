import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'hyphensAuto'
  | 'line-clamp-2'
  | '-top-16'
  | 'last:odd:col-span-full'
  | 'custom-scrollbar-body'
  | 'custom-scrollbar-thumb'
  | 'custom-qr-code'
  | 'hover-tertiary'
  | 'each-new-line:last:col-span-full'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
