#!/usr/bin/env node
import { realpath } from 'fs/promises'
import { start } from 'repl'

const file = await realpath(process.argv.splice(2, 1).pop())
process.argv[1] = file
const api = {...await import(file)}

if (api.default) {
  process.emitWarning('Default export cannot be exposed in hrepl (default is a reserved word)\n')
  delete api.default
}

Object.assign(global, api)

console.log('API:', Object.entries(api).map(([k, v]) => `${k} (${Array.isArray(v) ? 'array' : typeof v})`).join(', '))

start({ ignoreUndefined: true })
