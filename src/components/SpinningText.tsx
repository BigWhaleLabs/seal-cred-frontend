import classnames, { animation, position } from 'classnames/tailwind'

const spinner = classnames(animation('animate-spin'), position('absolute'))

export default function SpinningText() {
  return <div className={spinner}>Certified with SealCred ZK Proof</div>
}
