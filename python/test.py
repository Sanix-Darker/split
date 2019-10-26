# We import the module
from Split import Split

# We instantiate and pass the path of the file we ant to split, the debug mode is just to see logs
s = Split.Split("../data_test/rrr.mp4", DEBUG_MODE=True)

# We decompose the file in multiple chunks
s.deCompose()

# We can print the map of the file
print(s.getMap())

# Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake("../data_test/rrr2.mp4", s.getMap(), "../chunks/", delete_residuals=True)