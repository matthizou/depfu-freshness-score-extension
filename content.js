;(function () {
  'use strict'

  // Notes: To list all dependencies, execute in console:
  //  $('.dep-name').toArray().map(x => x.innerHTML).sort().join('\n')
  function applyExtension() {
    $('.outdated-deps tr').forEach((tr) => {
      const dependencyNameCell = tr.querySelector('.dep-name')
      if (dependencyNameCell) {
        //
        // Adding freshness info
        //
        const current = tr.querySelector('.locked').innerHTML
        const latest = tr.querySelector('.latest').innerHTML
        const score = calculateScore(current, latest)
        if (score <= 0 || isNaN(score)) {
          return
        }
        const statusCell = tr.querySelector('.status')
        statusCell.innerHTML = ''
        const scoreElement = document.createElement('span')
        scoreElement.className = 'score-label'
        scoreElement.innerText = score
        statusCell.appendChild(scoreElement)

        const icon = getScoreIcon(score)
        if (icon) {
          const scoreIcon = document.createElement('span')
          scoreIcon.className = 'score-icon'
          scoreIcon.innerText = icon
          statusCell.appendChild(scoreIcon)
        }
      }
    })

    addStyle(`
.score-label {  border: solid 1px #AAA; padding: 4px; border-radius: 4px; background-color: #FEFEFE; cursor: pointer }
td.status {  position: relative; }
.score-icon{ position: absolute; width: 50px; }
`)
  }

  function getScoreIcon(score) {
    if (score >= 400) {
      return '🧟'
    }
    if (score >= 200) {
      return '☠️'
    }
    if (score >= 100) {
      return '🔥'
    }
    if (score >= 50) {
      return '🌧️'
    }
    if (score >= 25) {
      return '☁️'
    }
    if (score <= 0) {
      return '✔'
    }
  }

  function calculateScore(version1, version2) {
    const MAJOR_VALUE = 100
    const MINOR_VALUE = 10
    const GAP_VALUE = 1

    const [major1, minor1, patch1] = version1
      .split('.')
      .map((x) => parseInt(x, 10))
    const [major2, minor2, patch2] = version2
      .split('.')
      .map((x) => parseInt(x, 10))

    let minorGap, patchGap
    if (major1 !== major2) {
      minorGap = Math.min(minor2 * MINOR_VALUE, MAJOR_VALUE - 1)
      patchGap = Math.min(patch2 * GAP_VALUE, MINOR_VALUE - 1)
      return MAJOR_VALUE * (major2 - major1) + minorGap + patchGap
    }
    if (minor2 !== minor1) {
      minorGap = Math.min((minor2 - minor1) * MINOR_VALUE, MAJOR_VALUE - 1)
      patchGap = Math.min(patch2 * GAP_VALUE, MINOR_VALUE - 1)
      return minorGap + patchGap
    } else {
      return (patch2 - patch1) * GAP_VALUE
    }
  }

  // -------------------
  // STARTUP BLOCK
  // -------------------
  // Notes: Every time the page changes, the entire DOM is regenerared
  const observer = new MutationObserver((mutations) => {
    const body = mutations
      .filter(({ addedNodes }) => addedNodes && addedNodes.length)
      .map((mutation) => mutation.addedNodes[0])
      .find((element) => element.tagName === 'BODY')
    if (body) {
      applyExtension()
    }
  })

  observer.observe(document.body.parentNode, {
    childList: true,
  })

  applyExtension()

  // ---------------
  // UTIL FUNCTIONS
  // ---------------

  /** Shorthand for querySelectorAll, JQuery style */
  function $(selector, element = document) {
    return Array.from(element.querySelectorAll(selector))
  }

  /** Insert css styles in a stylesheet injected in the head of the document */
  function addStyle(css) {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css
    document.getElementsByTagName('head')[0].appendChild(style)
  }
})()
