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

## Author

- Sanix-darker