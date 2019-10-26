class B64{

    b64encode(str){
        return Buffer.from("Hello World").toString('base64')
    }

    _base64ToArrayBuffer(base64) {
        var binary_string =  Buffer.from(base64, 'base64');
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    b64decode(){
        return _base64ToArrayBuffer(base64)
    }
}

export default B64;