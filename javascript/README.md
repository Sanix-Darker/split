# CODEC-JAVASCRIPT

This is an implementation of codec for a codec-client in Javascript.

## How to use

- Copy and paste the codec directory in your project

- install `axios` and `fs`, codec need them to work (`yarn install` will install them).
```json
  "dependencies": {
    "axios": "^0.19.0",
    "fs": "^0.0.1-security"
  }
```


- In your code follow theese instructions:

```javascript
// First you import Codec
import Codec from "./codec"

// You instantiate codec with the link of the API
let cc = new Codec()

cc.setCodecApiUrl("http://127.0.0.1:7171")

// You can get the message error, lang is not required as default it's en
cc.getMessage("PAC005", "fr").then(message => {
    console.log("getMessage: ", message)
})

// You can get the description error, lang is not required as default it's en
cc.getDescription("PAC004").then(message => {
    console.log("getDescription: ", message)
})

// You can get the concerned microservice
cc.getMicroservice("PAC004").then(message => {
    console.log("getMicroservice: ", message)
})

// You can check if it's an error or not
cc.isException("PAC004").then(message => {
    console.log("isException: ", message)
})
```

## How to test

Note that you Codec API most been running before test codec-client
The fetch will be done "ONCE" if a local database is not detected
To test, you can run :
```shell
yarn start
```

## Author
- Sanix darker (Ange SAADJIO)