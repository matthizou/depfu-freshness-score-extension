chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading' || !tab || !tab.url) {
    return
  }
  const url = new URL(tab.url)
  const origin = url.origin + '/*'

  chrome.permissions.contains(
    {
      permissions: ['tabs'],
      origins: [origin],
    },
    function (result) {
      const isAuthorized = Boolean(result)
      if (isAuthorized) {
        chrome.tabs.executeScript(tabId, {
          file: 'content.js',
          runAt: 'document_end',
        })
      }
    },
  )
})

// The handler toggles the icon between grayscale and color modes,
// depending whether the script has the page access for this URL.
// It could have been done simpler with "page action" rather than "browser action"
// but I didn't manage to have the popup working in this setup.
chrome.tabs.onActivated.addListener(() => {
  // B&W icon
  chrome.browserAction.setIcon({
    path: './images/depfu_score16_disabled_2.png',
  })
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    ([currentTab]) => {
      const url = new URL(currentTab.url)
      const origin = url.origin + '/*'

      // Checks whether the current tab has the permissions
      chrome.permissions.contains(
        {
          permissions: ['tabs'],
          origins: [origin],
        },
        function (result) {
          const isAuthorized = Boolean(result)
          if (isAuthorized) {
            // Color icon
            chrome.browserAction.setIcon({
              path: './images/depfu_score16.png',
            })
          }
        },
      )
    },
  )
})
