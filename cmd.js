#!/usr/bin/env node
import { realpath } from 'fs/promises'
import { start } from 'repl'

const file = await realpath(process.argv.splice(2, 1).pop())
process.argv[1] = file
const api = await import(file)
delete api.default

Object.assign(global, api)

start({ ignoreUndefined: true })
