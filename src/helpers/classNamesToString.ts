import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'hyphensAuto'
  | 'line-clamp-2'
  | '-top-16'
  | 'custom-scrollbar-body'
  | 'custom-scrollbar-thumb'
  | 'custom-qr-code'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
