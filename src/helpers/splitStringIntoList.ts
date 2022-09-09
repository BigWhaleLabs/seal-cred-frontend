export default function (str: string) {
  return str.includes(' ') ? str.split(' ') : str.split(',')
}
