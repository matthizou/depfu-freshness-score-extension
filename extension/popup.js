const { name, version } = chrome.runtime.getManifest()
const { id: extensionId } = chrome.runtime
document.getElementById('version').innerText = version
console.log(chrome.runtime.getManifest())

chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  ([currentTab]) => {
    const url = new URL(currentTab.url)
    const origin = url.origin + '/*'
    document.getElementById('origin').innerText = origin

    chrome.permissions.contains(
      {
        permissions: ['tabs'],
        origins: [origin],
      },
      function (result) {
        const isActivated = Boolean(result)
        if (isActivated) {
          document.getElementById('availability').innerText =
            'Extension activated for this domain'
          document.getElementById('goToOptions').innerText = ''
        } else {
          document.getElementById('availability').innerHTML =
            'Extension not activated for this domain.'
        }
      },
    )
  },
)
