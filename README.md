<img src="./logo.png" width="90">

# SPLIT

## Introduction

SPLIT is a FROM SCRATCH module able to decompose and recompose a file based on a map-schema build using md5 and Base64.

## Available clients

- (Stable) [Split-Python](/python)
- (Stable) [Split-Javascript](/javascript)

All examples of implementations are done in each versions, for more details contact the Author.


#### Example Usage

```python
# We import the Class/module
from Split import Split

# We instantiate and pass the path of the file we ant to split, the debug mode is just to see logs
s = Split.Split("../data_test/rrr.mp4", DEBUG_MODE=True)

# We decompose the file in multiple chunks
s.deCompose()

# We can print the map of the file
print(s.getMap())

# Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake("../data_test/rrr2.mp4", s.getMap(), "../chunks/", delete_residuals=True)
```

#### OUTPUT EXAMPLE

```shell
[+] Decompose started...
{'size': 93281, 'chunck': 4}
[+] SIZE: 373124
[+] RE_SIZE: {'size': 4, 'chunck': 93281}
[+] CONTENT_PER_CHUNKCS: 93281
[+] COUNT_OF_CHUNCK: 4
> chunck: 45a9d1e4da1b86b7d052e1d8bec54052
> chunck: 9a6ad3724b5efb40f30e4130480535ea
> chunck: 5fd2104117efd1300b7cbb9508c5e5ee
> chunck: ab61142db3239a5dfbe402ced841cace
[+] Decompose done.
-------
{0: '45a9d1e4da1b86b7d052e1d8bec54052', 1: '9a6ad3724b5efb40f30e4130480535ea', 2: '5fd2104117efd1300b7cbb9508c5e5ee', 3: 'ab61142db3239a5dfbe402ced841cace'}
[+] Remake started...
[+] Remake done.
```

## Author

- Sanix-darker