# Split-Python

An implementation of Split in Python


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


## Author

- Sanix-darker