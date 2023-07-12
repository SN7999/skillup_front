import Cookies from 'js-cookie'

export function setSessionCookie(JSESSIONID) {
  Cookies.set('JSESSIONID', JSESSIONID)
}

export function getSessionCookie() {
  return Cookies.get('JSESSIONID')
}

export function removeSessionCookie() {
  //Cookies.remove();
  Cookies.remove('JSESSIONID', { domain: 'localhost', path: '/' })
}
