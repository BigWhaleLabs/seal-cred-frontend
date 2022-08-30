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
  | 'last-row-modifier'
  | 'lg:each-new-line-3:pre-last:col-span-3'
  | 'lg:each-from-second:not-each-new-line-3:not-thirds:last:col-span-3'
  | 'lg:each-new-line-3:last:col-span-full'
  | 'smToLg:odd:last:col-span-full'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
