export default function (secret: string) {
  const messageLength = 130
  const nulifierLength = 14
  const regex = new RegExp(
    `^[a-zA-Z\\d]{${messageLength}}-[a-zA-Z\\d]{${nulifierLength}}$`,
    'g'
  )

  return regex.test(secret.trim())
}
