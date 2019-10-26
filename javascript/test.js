import Codec from "./Split"

let cc = new Codec()

cc.setCodecApiUrl("http://127.0.0.1:7171")

cc.getMessage("PAC005", "fr").then(message => {
    console.log("getMessage: ", message)
})

cc.getDescription("PAC004", "fr").then(message => {
    console.log("getDescription: ", message)
})

cc.getMicroservice("PAC004").then(message => {
    console.log("getMicroservice: ", message)
})

cc.isException("PAC004").then(message => {
    console.log("isException: ", message)
})

// console.log("cc.map: ", cc.map)