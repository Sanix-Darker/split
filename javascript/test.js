import Split from "./Split"

let s = new Split("../data_test/test.mp4", true)

// We decompose the file in multiple chunks
s.deCompose()

// We can print the map of the file
console.log(s.getMap())

//Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake("../data_test/rrr2.mp4", s.getMap(), "../chunks/", true)