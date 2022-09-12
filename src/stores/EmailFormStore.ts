import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import { toast } from 'react-toastify'
import env from 'helpers/env'

const fileEmailRegex =
  /(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/gm

function isEmailValidInInput(email: string) {
  const re =
    /^(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))\s$/g
  return re.test(email)
}

class EmailFormStore extends PersistableStore {
  emailDomain = ''
  inputEmail = ''
  emailList: string[] = []

  setEmailListFromFile(stringList: string) {
    const emailArrays = stringList.matchAll(fileEmailRegex)
    console.log(emailArrays)

    for (const emailArray of emailArrays) {
      const email = emailArray[0]
      if (
        this.checkDuplicates.bind(this)(email) &&
        this.checkSameDomain.bind(this)(email)
      )
        this.emailList.push(email)
    }
  }

  private checkSameDomain(email: string) {
    if (!this.emailList.length) return true
    const domain = email.split('@')[1]

    if (this.emailList[0].split('@')[1] === domain) return true
    toast.warn('Emails must be from the same domain')
    return false
  }

  private checkDuplicates(email: string) {
    if (!this.emailList.includes(email)) return true

    toast.warn("Duplicate emails don't make you more anonymous 👀")
    return false
  }

  removeFromListByIndex(index: number) {
    this.emailList = [
      ...this.emailList.slice(0, index),
      ...this.emailList.slice(index + 1),
    ]
  }

  safeInputChecker(emailFromInput: string) {
    this.inputEmail = emailFromInput
    const trimmedEmail = emailFromInput.trim()

    if (
      isEmailValidInInput(this.inputEmail) &&
      this.checkSameDomain(trimmedEmail) &&
      this.checkDuplicates(trimmedEmail)
    ) {
      this.emailList.push(trimmedEmail)
      this.inputEmail = ''
    }
  }
}

export default proxy(new EmailFormStore()).makePersistent(env.VITE_ENCRYPT_KEY)
