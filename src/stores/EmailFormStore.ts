import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import { toast } from 'react-toastify'
import env from 'helpers/env'

const fileEmailRegex =
  /(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/gm

function isEmailValidInInput(email: string) {
  const re =
    /^(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))(\s|,|;)$/g
  return re.test(email)
}

export interface EmailMapping {
  // "input" is reserved fileName
  [fileName: string]: {
    email: string
    isOtherDomain: boolean
  }[]
}

class EmailFormStore extends PersistableStore {
  emailDomain = ''
  inputEmail = ''
  emailMapping = {} as EmailMapping
  hasDifferentDomains = false

  private createOrPush(
    fileName: string,
    email: string,
    isOtherDomain: boolean
  ) {
    if (this.emailMapping[fileName]) {
      this.emailMapping[fileName].push({ email, isOtherDomain })
    } else {
      this.emailMapping[fileName] = [{ email, isOtherDomain }]
    }
  }

  private getEmailsArray() {
    return Object.values(this.emailMapping).flat()
  }

  private checkSameDomain(fileName?: string, email?: string) {
    const emailsArray = this.getEmailsArray()
    const firstEmail = emailsArray[0]
    if (!firstEmail) return (this.hasDifferentDomains = false)

    // We assume that first domain is domain of truth one and compare all others to it
    const firstDomain = this.getDomain(firstEmail.email)

    // Checks whole list when we remove email
    if (!fileName || !email) {
      this.hasDifferentDomains = false
      emailsArray.forEach(({ email }) => {
        if (this.getDomain(email) !== firstDomain)
          this.hasDifferentDomains = true
      })
      return this.hasDifferentDomains
    }

    // Checks when we add email
    const inputDomain = this.getDomain(email)

    if (firstDomain === inputDomain) return (this.hasDifferentDomains = false)

    return (this.hasDifferentDomains = true)
  }

  private getDomain(email: string) {
    return email.split('@')[1]
  }

  private checkDuplicates(inputEmail: string) {
    if (!Object.keys(this.emailMapping)) return true
    const hasDuplicates = Object.values(this.emailMapping)
      .flat()
      .filter(({ email }) => email === inputEmail)

    if (!hasDuplicates.length) return true

    toast.warn("Duplicate emails don't make you more anonymous 👀")
    return false
  }

  private deleteFile(fileName: string) {
    delete this.emailMapping[fileName]
  }

  private setAllIsNotSameDomain() {
    for (const emails of Object.values(this.emailMapping)) {
      for (const email of emails) {
        email.isOtherDomain = false
      }
    }
  }

  setEmailListFromFile(stringList: string, fileName: string) {
    for (const emailArray of stringList.matchAll(fileEmailRegex)) {
      const email = emailArray[0]
      if (!this.checkDuplicates.bind(this)(email)) continue

      this.checkSameDomain.bind(this)(fileName, email)
      this.createOrPush(fileName, email, this.hasDifferentDomains)
    }
  }

  removeEmailsFromList(fileName: string, index?: number) {
    if (index !== undefined) {
      this.emailMapping[fileName] = this.emailMapping[fileName].filter(
        (_, indexToCheck) => indexToCheck !== index
      )
      // If we remove first email, than we update the domain of truth
      if (index === 0) this.setAllIsNotSameDomain()
      if (!this.emailMapping[fileName].length) this.deleteFile(fileName)
    } else {
      this.deleteFile(fileName)
    }

    this.checkSameDomain()
  }

  safeInputChecker(emailFromInput: string) {
    this.inputEmail = emailFromInput
    const emailWithoutSeparator = emailFromInput.trim().replace(/[,;]$/, '')

    if (
      !isEmailValidInInput(this.inputEmail) ||
      !this.checkDuplicates(emailWithoutSeparator)
    )
      return

    const fileName = 'input'

    this.checkSameDomain(fileName, emailWithoutSeparator)
    this.createOrPush(fileName, emailWithoutSeparator, this.hasDifferentDomains)
    this.inputEmail = ''
  }
}

export default proxy(new EmailFormStore()).makePersistent(env.VITE_ENCRYPT_KEY)
