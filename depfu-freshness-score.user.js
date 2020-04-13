// ==UserScript==
// @name         Depfu Freshness Score
// @namespace    https://source.xing.com/matt-izoulet/
// @version      1.0
// @description  Add freshness scores and icons
// @author       Matthieu Izoulet
// @match        https://depfu.dc.xing.com/*
// ==/UserScript==

;(function () {
  'use strict'

  // Notes: Execute in console:
  // $('.dep-name').toArray().map(x => x.innerHTML).sort().join('\': \'Dev\',\n\'')
  // to get list on all dependencies
  $('.outdated-deps tr').forEach((tr) => {
    const dependencyNameCell = tr.querySelector('.dep-name')
    if (dependencyNameCell) {
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

  function getScoreIcon(score) {
    if (score >= 300) {
      return '☠️'
    }
    if (score >= 100) {
      return '🔥'
    }
    if (score >= 50) {
      return '🌧️'
    }
    if (score >= 30) {
      return '☁️'
    }
    if (score <= 0) {
      return '✔'
    }
  }

  function calculateScore(version1, version2) {
    const MAJOR_THRESHOLD = 100
    const [major1, minor1, patch1] = version1
      .split('.')
      .map((x) => parseInt(x, 10))
    const [major2, minor2, patch2] = version2
      .split('.')
      .map((x) => parseInt(x, 10))

    if (major1 !== major2) {
      return MAJOR_THRESHOLD * (major2 - major1) + minor2 * 10 + patch2
    }
    if (minor2 !== minor1) {
      const score = minor2 * 10 - minor1 * 10 + patch2
      return Math.min(score, MAJOR_THRESHOLD - 1)
    } else {
      return patch2 - patch1
    }
  }

  /** Shorthand for querySelectorAll, JQuery style */
  function $(selector, element = document) {
    return Array.from(element.querySelectorAll(selector))
  }

  /** Insert in DOM the specified node right after the specified reference node */
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
  }

  /** Insert css styles in a stylesheet injected in the head of the document */
  function addStyle(css) {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css
    document.getElementsByTagName('head')[0].appendChild(style)
  }
})()
