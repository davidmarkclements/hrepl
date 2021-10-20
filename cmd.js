#!/usr/bin/env node
import { realpath, readFile, writeFile } from 'fs/promises'
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
const repl = start({ 
  ignoreUndefined: true,
  removeHistoryDuplicates: true,
  breakEvalOnSigint: true
})
const history = new URL(import.meta.url).pathname.replace('cmd.js', 'history.txt')
repl.setupHistory(history, () => {})

repl.defineCommand('log', {
  help: 'Advanced iterative logging',
  async action (o) {
    repl.once('history', async (h) => { h.shift() })
    repl.write(`try { for await (const data of ${o}) console.log(data) } catch { console.log(${o}) }\n`)
  }
})