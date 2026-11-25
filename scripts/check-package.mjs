// Fails when a file the module needs at runtime is missing from the npm tarball.
// `npm pack --dry-run` alone only prints the file list and always exits 0.
import { execSync } from 'node:child_process'

const required = [
  'package.json',
  'module.ts',
  'translations.ts',
  'runtime/components/simpleDonation.vue',
  'runtime/composables/usePaypal.ts',
  'runtime/styles/style.css'
]

const [pack] = JSON.parse(execSync('npm pack --dry-run --json', { encoding: 'utf8' }))
const packed = new Set(pack.files.map((file) => file.path))
const missing = required.filter((file) => !packed.has(file))

if (missing.length) {
  console.error(`Missing from ${pack.filename}:\n${missing.map((file) => `  - ${file}`).join('\n')}`)
  process.exit(1)
}

console.log(`${pack.filename}: all ${required.length} required files present (${packed.size} files total)`)
