import { EmailFromList } from 'stores/EmailFormStore'

export default function (emails: EmailFromList[]) {
  const files = emails.map(({ fileName }) => fileName)
  const uniqueFiles = [...new Set(files)]
  return uniqueFiles.map((file) => ({
    fileName: file,
    amount: emails.filter(({ fileName }) => file === fileName).length,
  }))
}
