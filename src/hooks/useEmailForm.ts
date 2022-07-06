import { useState } from 'react'

function isEmailValid(email: string) {
  const re =
    /^(?=.{0,256}$)((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{0,64}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/
  return re.test(email)
}

export default function () {
  const [email, setEmail] = useState('')

  return { email, setEmail, emailIsValid: isEmailValid(email) }
}
