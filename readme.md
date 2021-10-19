# hrepl

> Hydrate-Read-Eval-Print-Loop

Hydrate a REPL with new globals from a file's exports.

Given a file at `path/to/file.js` containing the following:

```js
export const foo = () => { console.log('FOO') }
```

Running the following command will open a custom REPL:

```sh
hrepl path/to/file.js --some args
```

Typing `foo()` and hitting return in the REPL will result in the
output of `FOO!


```sh
> foo()
FOO!
```

The `process.argv` array will look as if the file has been run directly with Node.

In the example case, `process.argv` will be `[<exec path>, 'path/to/file.js', '--some', 'args'].

## Commands

The repl includes a `.log` command for async (or sync) iteration:

```sh
> async function * f () { yield 1; yield 2; yield 3 }
> o = f()
Object [AsyncGenerator] {}
> .log o
try { for await (const data of o) console.log(data) } catch { console.log(o) }
1
2
3
> .log [1,2,3]
try { for await (const data of [1,2,3]) console.log(data) } catch { console.log([1, 2, 3]) }
1
2
3
```


## Install

```sh
npm i -g hrepl
```


## License

MIT
