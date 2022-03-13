export const errorMessage = (status, customMsg) => {
  let message = ''
  switch (status) {
    case 400:
      message = `請求錯誤 (${status})`
      break
    case 401:
      message = `未授權請求 (${status})`
      break;
    case 403:
      message = `拒絕訪問 (${status})`
      break;
    case 404:
      message = `無法找到伺服器 (${status})`
      break;
    case 408:
      message = `請求超時 (${status})`
      break;
    case 500:
      message = `伺服器錯誤 (${status})`
      break;
    case 501:
      message = `伺服器無法辨識 (${status})`
      break;
    case 502:
      message = `網路錯誤 (${status})`
      break;
    case 503:
      message = `目前無法請求 (${status})`
      break;
    case 504:
      message = `請求超時 (${status})`
      break;
    case 505:
      message = `不支援的請求 (${status})`
      break;
    default:
      message = `非預期錯誤 (${status})!`;
  }

  if (customMsg) message = `(${status}) ${customMsg}`
  else message = `${message}，請檢查網路連線或聯絡我們 !`

  return message
}