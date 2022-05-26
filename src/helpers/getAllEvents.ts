import { QUERY_BLOCK_LIMIT } from '@big-whale-labs/constants'
import { SealCredLedger } from '@big-whale-labs/seal-cred-ledger-contract'

export default async function (sealCredLedger: SealCredLedger) {
  const eventsFilter = sealCredLedger.filters.SetMerkleRoot()
  const deleteEventsFilter = sealCredLedger.filters.DeleteMerkleRoot()

  let deleteTopic, setTopic
  const topics = []

  if (deleteEventsFilter.topics) {
    deleteTopic = Array.isArray(deleteEventsFilter.topics[0])
      ? deleteEventsFilter.topics[0][0]
      : deleteEventsFilter.topics[0]

    topics.push(deleteTopic)
  }

  if (eventsFilter.topics) {
    setTopic = Array.isArray(eventsFilter.topics[0])
      ? eventsFilter.topics[0][0]
      : eventsFilter.topics[0]

    topics.push(setTopic)
  }

  const events = (
    await sealCredLedger.queryFilter(
      {
        topics: [topics],
      },
      QUERY_BLOCK_LIMIT
    )
  ).map(sealCredLedger.interface.parseLog)

  return {
    deleteTopic,
    setTopic,
    events,
  }
}
