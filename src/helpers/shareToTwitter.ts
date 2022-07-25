export default function ({
  text,
  hashtags,
}: {
  text: string
  url?: string
  hashtags?: string[]
}) {
  const twitterUrl = 'https://twitter.com/intent/tweet'
  const hashtagsEncoded = hashtags ? `&hashtags=${hashtags.join(',')}` : ''

  const shareEncoded = `${twitterUrl}?text=${text}${hashtagsEncoded}`

  window.open(shareEncoded, '_blank')?.focus()
}
