const path = require('path')
const fs = require('fs')

console.log('Building userscript...')

const cwd = process.cwd()
const outputPath = path.resolve('./userscript.user.js')
const manifestPath = './manifest.json'
const userscriptPath = './userscript.user.js'

try {
  const manifest = require(manifestPath)
  const currentVersion = parseFloat(manifest.version)
  if (isNaN(currentVersion)) {
    throw `Invalid Version number in manifest: ${currentVersion}`
  }

  const newVersion = (currentVersion + 0.1).toFixed(1)
  console.log('New Version:', newVersion)

  // Update manifest
  manifest.version = newVersion
  const newManifestContent = JSON.stringify(manifest, null, 2)
  fs.writeFileSync(manifestPath, newManifestContent)

  // Generate userscript
  fs.writeFileSync(userscriptPath, generateUserscript(newVersion))
} catch (err) {
  console.error(`  Details: ${err}`)
}

function generateUserscript(newVersion) {
  const logic = fs.readFileSync('./content.js')
  const header = fs.readFileSync('./userscript-header.txt')
  return [
    '// ==UserScript==',
    header,
    `// @version      ${newVersion}`,
    '// ==/UserScript==',
    '',
    logic,
  ].join('\n')
}
