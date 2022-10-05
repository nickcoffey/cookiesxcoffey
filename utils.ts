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

export const getTruncatedDateStr = (date: Date) => {
  let dateStr = ''
  dateStr += date.getMonth() + 1
  dateStr += `/${date.getDate()}`
  dateStr += `/${date.getFullYear()}`
  return dateStr
}

type ObjType = Record<string, unknown>
export type PostResponse<ResponseBody extends ObjType> = {
  body: ResponseBody
  statusCode: number
}

export const httpPost = <
  RequestBody extends ObjType,
  ResponseBody extends ObjType
>(
  url: string,
  body: RequestBody
): Promise<PostResponse<ResponseBody>> =>
  new Promise(async (resolve, reject) => {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const responseBody = (await rawResponse.json()) as ResponseBody
    const statusCode = rawResponse.status
    const responseToReturn = { body: responseBody, statusCode }

    if (!rawResponse.ok) {
      reject(responseToReturn)
    }

    resolve(responseToReturn)
  })
