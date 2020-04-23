function save() {
  let customUrl = document.getElementById('custom_url').value
  if (!customUrl.length) {
    return
  }
  if (!customUrl.endsWith('/')) {
    error.textContent = 'Url must end with "/"'
    return
  }
  chrome.permissions.request(
    {
      origins: [customUrl],
    },
    function (granted) {
      if (!granted) {
        const error = document.getElementById('error')
        error.textContent = 'An error happened'
      }
    },
  )

  chrome.storage.sync.set(
    {
      custom_url: customUrl,
    },
    function () {
      document.getElementById('form').style.display = 'none'
      document.getElementById('success').style.display = 'block'
    },
  )
}

function restore() {
  chrome.storage.sync.get(
    {
      custom_url: '',
    },
    function (items) {
      document.getElementById('custom_url').value = items.custom_url
    },
  )
}

document.addEventListener('DOMContentLoaded', restore)
document.getElementById('save').addEventListener('click', save)
