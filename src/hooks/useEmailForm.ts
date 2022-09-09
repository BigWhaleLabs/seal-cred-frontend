import { useState } from 'react'

function isEmailValid(email: string) {
  const re =
    /^(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))\s$/g
  return re.test(email)
}

export default function () {
  const [email, setEmail] = useState('')
  const [emailList, setEmailList] = useState<string[]>([])

  if (isEmailValid(email)) {
    setEmailList([...emailList, email.trim()])
    setEmail('')
  }

  return {
    email,
    setEmail,
    emailList,
    setEmailList,
    listIsValid: emailList.length > 9,
  }
}
