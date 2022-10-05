export const removePhoneMask = (phoneStr: string) => phoneStr.replace(/\D/g, '')

export const maskPhone = (newPhoneStr: string, oldPhoneStr?: string) => {
  let formattedPhone = removePhoneMask(newPhoneStr)

  if (formattedPhone.length > 6) {
    formattedPhone = `(${formattedPhone.substring(
      0,
      3
    )})${formattedPhone.substring(3, 6)}-${formattedPhone.substring(6, 10)}`
  } else if (
    oldPhoneStr &&
    oldPhoneStr.length === 5 &&
    newPhoneStr.length === 4
  ) {
    formattedPhone = `(${formattedPhone.substring(0, 2)}`
  } else if (formattedPhone.length > 3) {
    formattedPhone = `(${formattedPhone.substring(
      0,
      3
    )})${formattedPhone.substring(3)}`
  } else if (formattedPhone.length > 2) {
    formattedPhone = `(${formattedPhone})`
  } else if (formattedPhone.length > 0) {
    formattedPhone = `(${formattedPhone}`
  }

  return formattedPhone
}
