export default function (error: unknown) {
  // Sometimes this error fires when user switching between networks too fast, we should not clean data in this case
  if (
    error instanceof Error &&
    error.message.includes('Attempting to connect.')
  ) {
    return true
  }
}
