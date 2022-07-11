import { THeight, height } from 'classnames/tailwind'

export default function ({ h = 'h-10' }: { h?: THeight }) {
  return <div className={height(h)} />
}
