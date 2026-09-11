
from PIL import Image
import numpy as np

img = Image.open('public/assets/robot.png').convert('RGBA')
arr = np.array(img)

# Find all non-transparent pixels
y_indices, x_indices = np.where(arr[:, :, 3] > 0)
if len(y_indices) > 0:
    min_x, max_x = np.min(x_indices), np.max(x_indices)
    min_y, max_y = np.min(y_indices), np.max(y_indices)
    
    # We suspect a black bar at the bottom.
    # Let's crop the bottom 15% of the bounding box to remove the black line.
    box_h = max_y - min_y
    max_y = int(max_y - box_h * 0.15) 
    
    cropped = arr[min_y:max_y, min_x:max_x]
    Image.fromarray(cropped).save('public/assets/robot_clean.png')
    print('Robot cleaned!')
else:
    print('Empty image')

