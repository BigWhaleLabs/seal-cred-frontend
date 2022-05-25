import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'line-clamp-2'
  | '-top-16'
  | 'scrollbar-hide'
  | 'custom-scrollbar-body'
  | 'custom-scrollbar-thumb'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
