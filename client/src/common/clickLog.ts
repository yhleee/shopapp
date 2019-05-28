export interface DisplayInfo {
  clientWidth: number
  clientHeight: number
  scrollWidth: number
  scrollHeight: number
}

export const getDisplaySize = () => {
  if (!window || !document) return null
  const documentElement = document.documentElement
  const documentBody = document.getElementsByTagName('body')[0]

  const x = window.innerWidth || documentElement.clientWidth || documentBody.clientWidth
  const y = window.innerHeight || documentElement.clientWidth || documentBody.clientHeight
  const w = documentElement.scrollWidth
  const h = documentElement.scrollHeight

  return {
    clientWidth: Number(x),
    clientHeight: Number(y),
    scrollWidth: Number(w),
    scrollHeight: Number(h),
  }
}

export const getCookies = () => {
  if (!document) return
  const cookieStrings = document.cookie.split('; ')
  const cookies = new Object()
  cookieStrings.forEach(cookieString => {
    try {
      const cookieArray = cookieString.split('=')
      cookies[cookieArray[0]] = cookieArray[1]
    } catch (e) {}
  })
  return cookies
}

export const requestIFrame = (url: string) => {
  const iframe = document.createElement('iframe')

  iframe.style.display = 'none'
  iframe.src = url

  document.body.appendChild(iframe)
  setTimeout(() => {
    document.body.removeChild(iframe)
  }, 1000)
}

export interface clickLogParams {
  cd: string // code
  iw?: number // display inner width
  iy?: number // display inner height
  dw?: number // document width
  dy?: number // document height
  cx?: number // click position x
  cy?: number // click position y
  bu?: string // browser unique id
  uid?: string // user id (optional)
  kwd?: string // search keyword (optional)
  pid?: string // product id (optional)
  i?: number // click index no (optional)
  r?: number // expose rank (optional)
}

export const getParamString = (params: Object) => {
  const result = new Array()
  Object.keys(params).forEach((key, index) => {
    if (index === 0) result.push('?')
    else result.push('&')
    result.push(`${key}=${params[key]}`)
  })
  return result.join('')
}

export const clog = (params: clickLogParams) => (event: Event) => {
  console.log(event)
  const cookies = getCookies()
  params['bu'] = cookies['PCID']
  const displayInfo: DisplayInfo = getDisplaySize()
  params['iw'] = displayInfo.clientWidth
  params['ih'] = displayInfo.clientHeight
  params['dw'] = displayInfo.scrollWidth
  params['dh'] = displayInfo.scrollHeight
  const targetUrl = 'http://localhost:8800/logging/click.png'
  requestIFrame(targetUrl + getParamString(params))
}
