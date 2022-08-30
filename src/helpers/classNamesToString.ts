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
  | 'xl:each-new-row-in-3-cols:last:col-span-full'
  | 'xl:each-new-row-in-3-cols:pre-last:col-span-3'
  | 'xl:each-2nd-element-in-3-cols:last:col-span-3'
  | 'smToXl:odd:last:col-span-full'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
