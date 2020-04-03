#
# Split Class
# A module to decompose and reMake a file based on a map and chuncks
# By Sanix-darker
#

import base64 as b64
from hashlib import md5
from primes import prime_array
from os import remove, path, makedirs, system


class Split:

    def __init__(self, debug_mode=False, maximum_size_per_chunk=700000, minimum_number_of_chunk=7):
        self.debug_mode = debug_mode
        self.MAXIMUM_SIZE_PER_CHUNK = maximum_size_per_chunk
        self.MINIMUM_NUMBER_OF_CHUNK = minimum_number_of_chunk
        self.map = {}
        self.chunk_array = []

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
    def get_map(self):
        return self.map

    def set_map(self, m):
        self.map = m

    # Getter/setter for chunk_array
    def getChunk_array(self):
        return self.chunk_array

    def setChunk_array(self, m):
        self.chunk_array = m

    def split_print(self, obj):
        if self.debug_mode:
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
            if val % pri == 0 and pri >= self.MINIMUM_NUMBER_OF_CHUNK and val / pri < self.MAXIMUM_SIZE_PER_CHUNK:
                ancien_pri = int(pri)
                ancien_chunck = int(val / pri)
                print({"size": ancien_pri, "chunck": ancien_chunck})
                self.divide(ancien_chunck)

        return {"size": ancien_pri, "chunck": ancien_chunck}

    def verify_size_content(self, re_size):
        """
            We just need to make sure the number of size never > content per chunk

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
        """
        This method reconstruct the file

        Arguments:
            final_path {[type]} -- [description]
            map_ {[type]} -- [description]
            chunk_path {[type]} -- [description]
        """
        map_ = {int(k): v for k, v in map_.items()}
        print("[+] Remake started...")
        try:
            file_content_string = ""
            for i in range(0, len(map_)):
                file_content_string += open(chunk_path + map_[i], "r").read()
                if delete_residuals == True: remove(chunk_path + map_[i])
            file_content = b64.b64decode(file_content_string)
            with open(final_path, "wb") as f:
                f.write(file_content)
            print("[+] Remake done.")
        except Exception as e:
            print(e)
            print("[+] Remake went wrong.")

    def decompose(self, file_name):
        """
            This method decompose the file
        """
        print("[+] Decompose started...")
        with open(file_name, "rb") as image_file:

            # We check if the directory chunks doesn't exist, then, we create it
            if not path.exists("./chunks/"):
                makedirs("chunks")
            
            to_print = b64.b64encode(image_file.read()).decode('utf-8')
            size = len(to_print)
            re_size = self.verify_size_content(self.divide(size))
            content = ""
            i = 0

            print("[+] FILENAME: " + str(file_name))
            print("[+] " + str(re_size))
            print("[+] SIZE: " + str(size))
            
            while to_print:
                content = to_print[:re_size['chunck']]
                title = md5(content[:300].encode()).hexdigest()
                self.map[i] = title
                self.chunk_array.append({title: content})
                print("> chunck: " + title)

                system("mkdir ../chunks/")
                # Optionnal, to saved the chunks
                with open("../chunks/" + title, "w+") as file:
                    file.write(content)
                # Optionnal, to saved the chunks
                to_print = to_print[re_size['chunck']:]
                i += 1
            print("[+] Decompose done.")
            print("-------")
