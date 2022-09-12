import { toast } from 'react-toastify'
import { useState } from 'react'
import splitStringIntoList from 'helpers/splitStringIntoList'

export default function () {
  const [email, setEmail] = useState('')
  const [emailList, setEmailList] = useState<string[]>([])

  function setEmailListFromFile(stringList: string) {
    const splittedList = splitStringIntoList(stringList)

    splittedList.forEach((email) => {
      if (isEmailValid(email)) setEmailList([...emailList, email])
    })
  }

  function isEmailValid(email: string) {
    const re =
      /(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g
    return re.test(email)
  }
  function isEmailValidInInput(email: string) {
    const re =
      /(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))\s$/g
    return re.test(email)
  }

  function checkSameDomain(email: string) {
    if (!emailList.length) return true
    const domain = email.split('@')[1]

    if (emailList[0].split('@')[1] === domain) return true
    toast.warn('Emails must be from the same domain')
    return false
  }

  if (isEmailValidInInput(email) && checkSameDomain(email.trim())) {
    setEmailList([...emailList, email.trim()])
    setEmail('')
  }

  return {
    email,
    setEmail,
    emailList,
    setEmailList,
    setEmailListFromFile,
    listIsValid: emailList.length > 9,
  }
}
