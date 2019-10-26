import base64 as b64
from hashlib import md5
from primes import prime_array

FILENAME = "./test2.mp4"
MAXIMUM_SIZE_PER_CHUNK = 900001
MINIMUM_NUMBER_OF_CHUNK = 5


def divide(val):
    """[This method have the role on dividing multiple timethe global base64 string to optain the best ratio prime and content]

    Arguments:
        val {[type]} -- [description]

    Returns:
        [type] -- [description]
    """
    ancien_pri = 9999999
    ancien_chunck = 0
    for pri in prime_array:
        if val%pri == 0:
            if (int(pri) >= MINIMUM_NUMBER_OF_CHUNK and int(pri) <= ancien_pri and int(val/pri) < MAXIMUM_SIZE_PER_CHUNK):
                ancien_pri = int(pri)
                ancien_chunck = int(val/pri)
            divide(val/pri)
    return { "size": ancien_pri, "chunck": ancien_chunck }

def verify_size_content(re_size):
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


with open(FILENAME,"rb") as image_file:
    to_print = b64.b64encode(image_file.read()).decode('utf-8')
    size = len(to_print)
    re_size_val = divide(size)
    re_size = verify_size_content(re_size_val)

    print("SIZE: " ,size)
    print("RE_SIZE: " ,re_size_val)
    print("CONTENT_PER_CHUNKCS: " ,re_size['chunck'])
    print("COUNT_OF_CHUNCK: " ,re_size['size'])

    map_ = {}
    content = ""
    i = 0
    while to_print:
        content += to_print[:re_size['chunck']]
        title = md5(content[:10].encode()).hexdigest()
        map_[i] = title
        with open("./chunks/"+title+".sp","w+") as file:
            print("Writing in : "+ "./chunks/"+title+".sp")
            file.write(content)
            content = ""
            i += 1
        to_print = to_print[re_size['chunck']:]
    print("map :",map_)