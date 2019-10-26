# SPLIT-JAVASCRIPT

This is an implementation of Split in Javascript.

## How to install

- Copy and paste the Split directory in your project

- install  `fs`, Split need them to work (`yarn install` will install them).
```json
  "dependencies": {
    "fs": "^0.0.1-security"
  }
```

## How to use

As follow, this is the content of the test script:

```javascript
import Split from "./Split"

// The path and the debug parameter, not required
let s = new Split("../data_test/file.png", true)

// We decompose the file in multiple chunks
s.deCompose()

// We can print the map of the file
console.log(s.getMap())


//Let's ReMake in another file, the delete_residual parameter will delete all chunks(as true)
s.reMake("../data_test/file2.png", s.map, "../chunks/", true)
```

## Tests

To test, just run this in your CLI:
```shell
yarn start
```

## Expected Output

```shell
[+] Decompose started...
{ size: 93281, chunck: 4 }
[+] SIZE: 373124
[+] RE_SIZE: { size: 4, chunck: 93281 }
[+] CONTENT_PER_CHUNKCS: 93281
[+] COUNT_OF_CHUNCK: 4
> chunck: 45a9d1e4da1b86b7d052e1d8bec54052
> chunck: 9a6ad3724b5efb40f30e4130480535ea
> chunck: 5fd2104117efd1300b7cbb9508c5e5ee
> chunck: ab61142db3239a5dfbe402ced841cace
[+] Decompose done.
-------
{ '0': '45a9d1e4da1b86b7d052e1d8bec54052',
  '1': '9a6ad3724b5efb40f30e4130480535ea',
  '2': '5fd2104117efd1300b7cbb9508c5e5ee',
  '3': 'ab61142db3239a5dfbe402ced841cace' }
[+] Remake started...
[+] Remake done.
File created
```

## Author

- Sanix-darker