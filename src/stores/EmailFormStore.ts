import { proxy } from 'valtio'
import { toast } from 'react-toastify'

const inputEmailRegex = /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+(\s|,|;)/gm
const emailRegex = /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/gm

function isEmailValidInInput(email: string) {
  return inputEmailRegex.test(email)
}

export const inputFileName = 'input'

export interface EmailFromList {
  email: string
  isOtherDomain: boolean
  fileName: string
}

class EmailFormStore {
  inputEmail = ''
  domainOfTruth = ''
  loading = false
  emailList = [] as EmailFromList[]
  hasDifferentDomains = false
  warnedAboutDuplicates = false

  private safePushToList(fileName: string, email: string) {
    this.checkSameDomain(email)
    this.emailList.push({
      email,
      fileName,
      isOtherDomain: this.hasDifferentDomains,
    })
    this.hasDifferentDomainsInList(true)
  }

  private resetDomainOfTruth() {
    if (!this.emailList.length) {
      this.domainOfTruth = ''
      this.hasDifferentDomains = false
      return
    }
    this.domainOfTruth = this.getDomain(this.emailList[0].email)
  }

  private hasDifferentDomainsInList(shouldResetDomainOfTruth = false) {
    if (shouldResetDomainOfTruth) this.resetDomainOfTruth()
    this.hasDifferentDomains = false

    for (const email of this.emailList) {
      if (this.getDomain(email.email) === this.domainOfTruth) {
        email.isOtherDomain = false
        continue
      }

      this.hasDifferentDomains = true
      email.isOtherDomain = true
    }
  }

  private checkSameDomain(email: string) {
    if (!this.domainOfTruth) this.resetDomainOfTruth()

    const inputDomain = this.getDomain(email)

    if (this.domainOfTruth === inputDomain)
      return (this.hasDifferentDomains = false)

    this.hasDifferentDomains = true
  }

  private getDomain(email: string) {
    return email.split('@')[1]
  }

  private checkDuplicates(inputEmail: string, inFile?: boolean) {
    if (!this.emailList.length) return true

    const duplicates = this.emailList.filter(
      ({ email }) => email === inputEmail
    )

    if (!duplicates.length) return true

    if (!this.warnedAboutDuplicates)
      toast.warn("Duplicate emails don't make you more anonymous 👀")
    if (inFile) this.warnedAboutDuplicates = true
    return false
  }

  private deleteFile(fileNameToDelete: string) {
    this.emailList = this.emailList.filter(({ fileName }) => {
      return fileName !== fileNameToDelete
    })
    this.hasDifferentDomainsInList(true)
  }

  setEmailListFromFile(stringList: string, fileName: string) {
    for (const emailArray of stringList.matchAll(emailRegex)) {
      const email = emailArray[0]
      if (!this.checkDuplicates.bind(this)(email, true)) continue

      this.safePushToList.bind(this)(fileName, email)
    }
    this.warnedAboutDuplicates = false
  }

  removeLastEmail() {
    if (this.inputEmail) return

    this.emailList.pop()
    this.hasDifferentDomainsInList()
  }

  removeEmailsFromList(fileName: string, indexToRemove?: number) {
    if (indexToRemove === undefined) {
      this.deleteFile(fileName)
    } else {
      this.emailList.splice(indexToRemove, 1)
      this.hasDifferentDomainsInList(indexToRemove === 0)
    }
  }

  safeInputChecker(emailFromInput: string) {
    this.inputEmail = emailFromInput
    const rawEmail = emailFromInput.trim().replace(/[,;]$/, '')

    if (!isEmailValidInInput(emailFromInput) || !this.checkDuplicates(rawEmail))
      return

    this.safePushToList(inputFileName, rawEmail)
    this.inputEmail = ''
  }
}

export default proxy(new EmailFormStore())
