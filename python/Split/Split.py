#
# Split Class
# A module to decompose and reMake a file based on a map and chuncks
# By Sanix-darker
#

import base64 as b64
from hashlib import md5
from .primes import prime_array
from os import remove

class Split:

    def __init__(self, FILENAME, DEBUG_MODE = False, MAXIMUM_SIZE_PER_CHUNK = 700000, MINIMUM_NUMBER_OF_CHUNK = 7):
        self.DEBUG_MODE = DEBUG_MODE
        self.FILENAME = FILENAME
        self.MAXIMUM_SIZE_PER_CHUNK = MAXIMUM_SIZE_PER_CHUNK
        self.MINIMUM_NUMBER_OF_CHUNK = MINIMUM_NUMBER_OF_CHUNK
        self.map = {}
        self.chunk_array = []


    # Getter/setter for DEBUG_MODE
    def getDEBUG_MODE(self):
        return self.DEBUG_MODE
    def setDEBUG_MODE(self, m):
        self.DEBUG_MODE = m

    # Getter/setter for FILENAME
    def getFILENAME(self):
        return self.FILENAME
    def setFILENAME(self, m):
        self.FILENAME = m

    # Getter/setter for MAXIMUM_SIZE_PER_CHUNK
    def getMAXIMUM_SIZE_PER_CHUNK(self):
        return self.MAXIMUM_SIZE_PER_CHUNK
    def setMAXIMUM_SIZE_PER_CHUNK(self, m):
        self.MAXIMUM_SIZE_PER_CHUNK = m


    # Getter/setter for MINIMUM_NUMBER_OF_CHUNK
    def getMINIMUM_NUMBER_OF_CHUNK(self):
        return self.MINIMUM_NUMBER_OF_CHUNK
    def setMINIMUM_NUMBER_OF_CHUNK(self, m):
        self.MINIMUM_NUMBER_OF_CHUNK = m


    # Getter/setter for map
    def getMap(self):
        return self.map
    def setMap(self, m):
        self.map = m


    # Getter/setter for chunk_array
    def getChunk_array(self):
        return self.chunk_array
    def setChunk_array(self, m):
        self.chunk_array = m


    def split_print(self, obj):
        if self.DEBUG_MODE == True:
            print(obj)

    def divide(self, val):
        """[This method have the role on dividing multiple timethe global base64 string to optain the best ratio prime and content]

        Arguments:
            val {[type]} -- [description]

        Returns:
            [type] -- [description]
        """
        ancien_pri = 999999
        ancien_chunck = 1
        for pri in prime_array:
            if val%pri == 0 and pri >= self.MINIMUM_NUMBER_OF_CHUNK and val/pri < self.MAXIMUM_SIZE_PER_CHUNK:
                ancien_pri = int(pri)
                ancien_chunck = int(val/pri)
                self.split_print({ "size": ancien_pri, "chunck": ancien_chunck })
                self.divide(ancien_chunck)

        return { "size": ancien_pri, "chunck": ancien_chunck }


    def verify_size_content(self, re_size):
        """[We just need to make sure the number of size never > content per chunk]

        Arguments:
            re_size {[type]} -- [description]

        Returns:
            [type] -- [description]
        """
        to_alternate = 0
        if re_size['chunck'] < re_size['size']:
            to_alternate = re_size['chunck']
            re_size['chunck'] = re_size['size']
            re_size['size'] = to_alternate
        return re_size


    def reMake(self, final_path, map_, chunk_path, delete_residuals=False):
        """[This method reconstruct the file]

        Arguments:
            final_path {[type]} -- [description]
            map_ {[type]} -- [description]
            chunk_path {[type]} -- [description]
        """
        map_ = {int(k):v for k,v in map_.items()}
        self.split_print("[+] Remake started...")
        try:
            file_content_string =""
            for i in range(0, len(map_)):
                file_content_string += open(chunk_path+map_[i], "r").read()
                if delete_residuals == True: remove(chunk_path+map_[i])
            file_content=b64.b64decode(file_content_string)
            with open(final_path,"wb") as f:
                f.write(file_content)
            self.split_print("[+] Remake done.")
        except Exception as e:
            print(e)
            self.split_print("[+] Remake went wrong.")


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

            content = ""
            i = 0
            while to_print:
                content = to_print[:re_size['chunck']]
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
                i += 1
            self.split_print("[+] Decompose done.")
            self.split_print("-------")