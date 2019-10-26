import Split from "./Split"

let s = new Split("../data_test/file.png", true)

// We decompose the file in multiple chunks
s.deCompose()

// We can print the map of the file
console.log(s.getMap())


//Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake("../data_test/file2.png", s.map, "../chunks/", true)