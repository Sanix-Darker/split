import Split from "./Split"

let s = new Split("../data_test/file.png", true)

// We decompose the file in multiple chunks
s.deCompose()

// We can print the map of the file
console.log(s.getMap())
// console.log("cc.map: ", cc.map)