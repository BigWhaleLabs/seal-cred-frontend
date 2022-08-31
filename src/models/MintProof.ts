import MintedToken from '@big-whale-labs/stores/dist/models/MintedToken'
import Proof from 'models/Proof'

export interface MintProof {
  proof: Proof
  onMinted?: (minted?: MintedToken[]) => void
  onMintFailed?: (minted?: MintedToken[]) => void
}
