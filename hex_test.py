import binascii

filename = './logo.png'
with open(filename, 'rb') as f:
    content = f.read()
val = binascii.hexlify(content)
print(val)

print("SIZE: ", len(val))