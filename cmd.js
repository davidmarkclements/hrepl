#!/usr/bin/env node
import { start } from 'repl'

const file = process.argv.splice(2, 1).pop()
process.argv[1] = file
const api = await import(file)
delete api.default

Object.assign(global, api)

start({ ignoreUndefined: true })
