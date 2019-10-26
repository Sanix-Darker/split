import fs from "fs";

import prime_array from "primes"

class Split {

    constructor(FILENAME, MAXIMUM_SIZE_PER_CHUNK = 300000, MINIMUM_NUMBER_OF_CHUNK = 3, DEBUG_MODE = False) {
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

        let ancien_pri = 9999999
        let ancien_chunck = 0

        for(let i =0; i<prime_array.length; i++){
            pri = prime_array[i]
            if (val%pri == 0){
                if (pri.parseInt() >= this.MINIMUM_NUMBER_OF_CHUNK && pri.parseInt() <= ancien_pri && (val/pri).parseInt() < this.MAXIMUM_SIZE_PER_CHUNK){
                    ancien_pri = pri.parseInt()
                    ancien_chunck = (val/pri).parseInt()
                    this.split_print({ "size": ancien_pri, "chunck": ancien_chunck })
                    break
                }
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


    // """[This method reconstruct the file]

    // Arguments:
    //     final_path {[type]} -- [description]
    //     map_ {[type]} -- [description]
    //     chunk_path {[type]} -- [description]
    // """
    reMake(final_path, map_, chunk_path, delete_residuals=false){
        this.split_print("[+] Remake started...")
        try{
            file_content_string =""
            for i in range(0, len(map_)):
                file_content_string += open(chunk_path+map_[i], "r").read()
                if delete_residuals == True: remove(chunk_path+map_[i])
            file_content=b64.b64decode(file_content_string)
            with open(final_path,"wb") as f:
                f.write(file_content)
            self.split_print("[+] Remake done.")
        }catch(err){
            console.log(e)
            this.split_print("[+] Remake went wrong.")
        }
    }




    def deCompose(self):
        """[This method decompose the file]
        """
        self.split_print("[+] Decompose started...")
        with open(self.FILENAME,"rb") as image_file:
            to_print = b64.b64encode(image_file.read()).decode('utf-8')
            size = len(to_print)
            re_size_val = self.divide(size)
            re_size = self.verify_size_content(re_size_val)

            self.split_print("[+] SIZE: " +str(size))
            self.split_print("[+] RE_SIZE: " +str(re_size_val))
            self.split_print("[+] CONTENT_PER_CHUNKCS: " +str(re_size['chunck']))
            self.split_print("[+] COUNT_OF_CHUNCK: " +str(re_size['size']))

            content = ""
            i = 0
            while to_print:
                content += to_print[:re_size['chunck']]
                title = md5(content[:10].encode()).hexdigest()
                self.map[i] = title
                self.chunk_array.append({title: content})
                self.split_print("> chunck: "+title)
                # Optionnal, to saved the chunks
                with open("../chunks/"+title,"w+") as file:
                    print("Writing in : "+ "../chunks/"+title)
                    file.write(content)
                # Optionnal, to saved the chunks
                to_print = to_print[re_size['chunck']:]
                content = ""
                i += 1
            self.split_print("[+] Decompose done.")
            self.split_print("-------")
}

export default Split;