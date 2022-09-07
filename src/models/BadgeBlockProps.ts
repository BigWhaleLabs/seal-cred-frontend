import Proof from 'models/Proof'

export interface BadgeBlockProps {
  proof: Proof
  onMinted?: () => void
  onMintFailed?: () => void
}
