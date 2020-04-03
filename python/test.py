# We import the Class/module
from python.Split import Split

# FILE_FOR_RECOMPOSE = "../data_test/rrr2.mp4"

# We instantiate and pass the path of the file we ant to split, the debug mode is just to see logs
s = Split(debug_mode=True)

# We decompose the file in multiple chunks
s.decompose("/home/d4rk3r/ACTUALC/vagrant/PYTHON/github/split-python/photo.jpg")

# We can print the map of the file
print(s.get_map())

# Let's ReMake in another file, the delete_residual parameter will delete all chunks
# s.reMake(FILE_FOR_RECOMPOSE, s.getMap(), "../chunks/", delete_residuals=True)