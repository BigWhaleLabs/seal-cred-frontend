export default function (secret: string) {
  const messageLength = 130
  const regex = new RegExp(`^[a-zA-Z\\d]{${messageLength}}$`, 'g')

  return regex.test(secret.trim())
}
