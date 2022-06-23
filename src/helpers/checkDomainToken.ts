export default function (secret: string) {
  const regexpMessage = /^[a-zA-Z\d]{130}$/g
  const regexpNulifier = /^[a-zA-Z\d]{14}$/g

  const splittedSecret = secret.trim().split('-')

  return (
    regexpMessage.test(splittedSecret[0]) &&
    regexpNulifier.test(splittedSecret[1])
  )
}
