import { CardDescription, CardTitle } from 'components/Card'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'

export default function ProofListCard() {
  return (
    <>
      <div>
        <CardTitle>Start proofing!</CardTitle>
        <CardDescription>Generate your ZK proof</CardDescription>
      </div>
      <ListOfReadyZKProofs />
      <ListOfAvailableZKProofs />
    </>
  )
}
