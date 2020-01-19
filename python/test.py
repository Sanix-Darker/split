# We import the Class/module
from Split import Split

FILE_TO_DECOMPOSE = "../data_test/rrr.mp4"
FILE_FOR_RECOMPOSE = "../data_test/rrr2.mp4"

# We instantiate and pass the path of the file we ant to split, the debug mode is just to see logs
s = Split.Split(FILE_TO_DECOMPOSE, DEBUG_MODE=True)

# We decompose the file in multiple chunks
s.deCompose()

# We can print the map of the file
print(s.getMap())

# Let's ReMake in another file, the delete_residual parameter will delete all chunks
s.reMake(FILE_FOR_RECOMPOSE, s.getMap(), "../chunks/", delete_residuals=True)