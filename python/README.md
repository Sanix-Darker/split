# SPLIT-PYTHON

An implementation of Split in Python


## Requirements

ANY REQUIREMENTS NEEDED !


## How to use

As follow, this is the content of the test script:
```python
# We import the module
from Split import Split

# We instantiate and pass the path of the file we ant to split, the debug mode is just to see logs
s = Split.Split("../data_test/file.png", DEBUG_MODE=True)

# We decompose the file in multiple chunks
s.deCompose()

# We can print the map of the file
print(s.getMap())

# Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake("../data_test/file2.png", s.map, "../chunks/", delete_residuals=True)
```

## Tests

To test, just run this in your CLI:
```shell
python test.py
```

## Expected Output

```shell
[+] Decompose started...
{'size': 93281, 'chunck': 4}
[+] SIZE: 373124
[+] RE_SIZE: {'size': 4, 'chunck': 93281}
[+] CONTENT_PER_CHUNKCS: 93281
[+] COUNT_OF_CHUNCK: 4
> chunck: 45a9d1e4da1b86b7d052e1d8bec54052
Writing in : ../chunks/45a9d1e4da1b86b7d052e1d8bec54052
> chunck: 9a6ad3724b5efb40f30e4130480535ea
Writing in : ../chunks/9a6ad3724b5efb40f30e4130480535ea
> chunck: 5fd2104117efd1300b7cbb9508c5e5ee
Writing in : ../chunks/5fd2104117efd1300b7cbb9508c5e5ee
> chunck: ab61142db3239a5dfbe402ced841cace
Writing in : ../chunks/ab61142db3239a5dfbe402ced841cace
[+] Decompose done.
-------
{0: '45a9d1e4da1b86b7d052e1d8bec54052', 1: '9a6ad3724b5efb40f30e4130480535ea', 2: '5fd2104117efd1300b7cbb9508c5e5ee', 3: 'ab61142db3239a5dfbe402ced841cace'}
[+] Remake started...
[+] Remake done.
```

## Author

- Sanix-darker