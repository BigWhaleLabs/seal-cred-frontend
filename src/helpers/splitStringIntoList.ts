export default function (str: string) {
  // TODO: probably worth using regex of /, /, / /, /,/
  return str.includes(' ') ? str.split(' ') : str.split(',')
}
