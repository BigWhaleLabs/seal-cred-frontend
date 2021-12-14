import { useParams } from 'react-router-dom'

export default function useAddress() {
  const { address } = useParams<{ address: string }>()
  return address
}
