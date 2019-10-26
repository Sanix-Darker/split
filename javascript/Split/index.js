/**
 * Split Class
 * A module to decompose and reMake a file based on a map and chuncks
 * By Sanix-darker
*/

import fs from "fs";
import B64 from "./mabase64"
import prime_array_list from "./primes"
let md5 = require("./md5.js")

const prime_array = prime_array_list()
class Split {

    constructor(FILENAME, DEBUG_MODE = false, MAXIMUM_SIZE_PER_CHUNK = 700000, MINIMUM_NUMBER_OF_CHUNK = 7) {
        this.DEBUG_MODE = DEBUG_MODE
        this.FILENAME = FILENAME
        this.MAXIMUM_SIZE_PER_CHUNK = MAXIMUM_SIZE_PER_CHUNK
        this.MINIMUM_NUMBER_OF_CHUNK = MINIMUM_NUMBER_OF_CHUNK
        this.map = {}
        this.chunk_array = []
    }


    // Getter/setter for DEBUG_MODE
    getDEBUG_MODE(){
        return this.DEBUG_MODE
    }
    setDEBUG_MODE(m){
        this.DEBUG_MODE = m
    }

    // Getter/setter for FILENAME
    getFILENAME(){
        return this.FILENAME
    }
    setFILENAME(m){
        this.FILENAME = m
    }

    // Getter/setter for MAXIMUM_SIZE_PER_CHUNK
    getMAXIMUM_SIZE_PER_CHUNK(){
        return this.MAXIMUM_SIZE_PER_CHUNK
    }
    setMAXIMUM_SIZE_PER_CHUNK(m){
        this.MAXIMUM_SIZE_PER_CHUNK = m
    }


    // Getter/setter for MINIMUM_NUMBER_OF_CHUNK
    getMINIMUM_NUMBER_OF_CHUNK(){
        return this.MINIMUM_NUMBER_OF_CHUNK
    }
    setMINIMUM_NUMBER_OF_CHUNK(m){
        this.MINIMUM_NUMBER_OF_CHUNK = m
    }


    // Getter/setter for map
    getMap(){
        return this.map
    }
    setMap(m){
        this.map = m
    }


    // Getter/setter for chunk_array
    getChunk_array(){
        return this.chunk_array
    }
    setChunk_array(m){
        this.chunk_array = m
    }


    split_print(obj){
        if (this.DEBUG_MODE == true){
            console.log(obj)
        }
    }

    // """[This method have the role on dividing multiple timethe global base64 string to optain the best ratio prime and content]
    // Arguments:
    //     val {[type]} -- [description]
    // Returns:
    //     [type] -- [description]
    // """
    divide(val){

        let ancien_pri = 999999
        let ancien_chunck = 1
        for(let i =0; i<prime_array.length; i++){
            const pri = prime_array[i]
            if (val%pri == 0 && pri >= this.MINIMUM_NUMBER_OF_CHUNK && pri <= ancien_pri && (val/pri) < this.MAXIMUM_SIZE_PER_CHUNK){
                ancien_pri = pri
                ancien_chunck = (val/pri)
                this.split_print({ "size": ancien_pri, "chunck": ancien_chunck })
                this.divide(ancien_chunck)
            }
        }

        return { "size": ancien_pri, "chunck": ancien_chunck }
    }


    // """[We just need to make sure the number of size never > content per chunk]
    // Arguments:
    //     re_size {[type]} -- [description]
    // Returns:
    //     [type] -- [description]
    // """
    verify_size_content(re_size){

        let to_alternate = 0
        if (re_size['chunck'] < re_size['size']){
            to_alternate = re_size['chunck']
            re_size['chunck'] = re_size['size']
            re_size['size'] = to_alternate
        }
        return re_size
    }


    //fs.readFileSync(this.json_file_path))
    //fs.writeFileSync(this.json_file_path, JSON.stringify(this.CodeObject))
    //fs.writeFile("out.png", base64Data, 'base64', function(err) { console.log(err); });

    // """[This method reconstruct the file]

    // Arguments:
    //     final_path {[type]} -- [description]
    //     map_ {[type]} -- [description]
    //     chunk_path {[type]} -- [description]
    // """
    reMake(final_path, map_, chunk_path, delete_residuals=false){
        this.split_print("[+] Remake started...")
        try{
            let file_content_string = ""
            for (let property in map_) {
                if (map_.hasOwnProperty(property)) {
                  // Do things here
                    file_content_string += fs.readFileSync(chunk_path+map_[property])

                    if (delete_residuals == true){
                        fs.unlinkSync(chunk_path+map_[property])
                    }
                }
            }
            fs.writeFile(final_path, file_content_string, {encoding: 'base64'}, function(err) { console.log('File created'); });

            this.split_print("[+] Remake done.")
        }catch(err){
            console.log(err)
            this.split_print("[+] Remake went wrong.")
        }
    }



    // """[This method decompose the file]
    // """
    deCompose(){
        this.split_print("[+] Decompose started...")
        let to_print = fs.readFileSync(this.FILENAME).toString('base64')
        let size = to_print.length
        let re_size_val = this.divide(size)
        let re_size = this.verify_size_content(re_size_val)
        let content = ""
        let array_to_print = to_print.match(new RegExp(".{1,"+re_size['chunck']+"}", "g"))

        this.split_print("[+] SIZE: " +size)

        for (let i=0;i<array_to_print.length; i++){
            content = array_to_print[i]
            let title = md5(content.substring(0,300))
            this.map[i] = title
            this.chunk_array.push({title: content})
            this.split_print("> chunck: "+title)
            // Optionnal, to saved the chunks
            fs.writeFileSync("../chunks/"+title, content)
            // Optionnal, to saved the chunks
        }
        this.split_print("[+] Decompose done.")
        this.split_print("-------")
    }

}

export default Split;