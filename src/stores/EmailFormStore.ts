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

  setEmailListFromFile(stringList: string, fileName: string) {
    const emailArrays = stringList.matchAll(fileEmailRegex)

    for (const emailArray of emailArrays) {
      const email = emailArray[0]
      if (!this.checkDuplicates.bind(this)(email)) return

      const differentDomains = this.checkSameDomain.bind(this)(fileName, email)
      this.createOrPush(fileName, email, differentDomains)
    }
  }

  private createOrPush(
    fileName: string,
    email: string,
    isOtherDomain: boolean
  ) {
    if (this.emailMapping[fileName]) {
      this.emailMapping[fileName].push({ email, isOtherDomain })
      return
    }

    this.emailMapping[fileName] = [{ email, isOtherDomain }]
  }

  private checkSameDomain(fileName: string, email: string) {
    const fileMapping = this.emailMapping[fileName]
    if (!fileMapping) return false

    const inputDomain = email.split('@')[1]

    if (fileMapping[0].email.split('@')[1] === inputDomain) {
      this.hasDifferentDomains = false
      return false
    }

    this.hasDifferentDomains = true
    return true
  }

  private checkDuplicates(inputEmail: string) {
    // TODO: duplicate checking should have 2 ways: 1) check if list 2) check input
    if (!Object.keys(this.emailMapping)) return true
    const hasDuplicates = Object.values(this.emailMapping)
      .flat()
      .filter(({ email }) => email === inputEmail)

    if (!hasDuplicates.length) return true

    toast.warn("Duplicate emails don't make you more anonymous 👀")
    return false
  }

  removeEmailsFromList(fileName: string, index?: number) {
    if (index !== undefined) {
      this.emailMapping[fileName] = this.emailMapping[fileName].filter(
        (_, indexToCheck) => indexToCheck !== index
      )
    } else {
      delete this.emailMapping[fileName]
    }
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
