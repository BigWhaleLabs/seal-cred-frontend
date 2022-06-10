import { useEffect, useState } from 'react'

export default function () {
  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(false)

  const isEmailValid = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  useEffect(() => {
    setEmailIsValid(isEmailValid(email))
  }, [email])

  return { email, setEmail, emailIsValid }
}
