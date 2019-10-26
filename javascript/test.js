import Split from "./Split"

let s = new Split("../data_test/test.mp4", true)

// We decompose the file in multiple chunks
// s.deCompose()

// We can print the map of the file
// console.log(s.getMap())
const mapp = {0: '321c191aac16e3fb8a78e133b99bfde4', 1: '60cf7a6667df44d787be837a31b79665', 2: '800d355525ab4cbdedde84f471b2bc6e', 3: '1393c34769224d019d96ca347ec83b9f', 4: '024744fee84b7ab89369ef3a0172fe3a', 5: 'c97a0029534991aa64a71b4abf533fe1', 6: '25fdc5dbdd5439ab2aced665bfa24e56', 7: '398093a04b6da158a14a80637cc89f64', 8: 'e0410f2e322573129e0e34e0bf9dcae8', 9: 'b35a6b1954299169cd9c478d3121513a', 10: '1cab0fe5d4923ed2dd2c3493d2cbb60f', 11: 'c4f2cd23fb28f57118fa567d797d802e', 12: '54b53ffdd9a3b4aa4f24d38cfec1c2da', 13: '69749afedd9b6751d781c53110343eb9', 14: 'e3631da4bf3f5ac0f10477706c33d442', 15: '3b5b1c9380875971635741e6c55538e9', 16: '89807751fb32ce3a9470f448f1d74e37', 17: 'e42be7af155bfbd55e693f36395922d3', 18: '80ca7b5459b03f050ce801409a95e104', 19: '265facf8c1c388434a3e797b2807d09d', 20: 'e8798aa921f3ccac6e3245b0455f54b0', 21: '830fe7e33becb25f54a4027f2c1beb7f', 22: 'd56df1e0cf6e4acd65992b11c73afe9a', 23: '9912e5c3b1846a0ef5d654975835950a', 24: 'e45ef5d595b848ca0c89b77516d5a5d6', 25: 'e78afa7e426922c8a0c5c28a1617ef7f', 26: '939cc76b0d1ac449108d7e49b0451cee', 27: 'c809358f55f26a373f0490abac2dfc1c', 28: '43b2b47f2b8d859f37318cd67ce6e1e8', 29: '5031986d66bcc6d9d91a1d1d2a8c1b40', 30: 'f95875b604e12a07ea144ef809c03c33'}


//Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake("../data_test/rrr2.mp4", mapp, "../chunks/", false)