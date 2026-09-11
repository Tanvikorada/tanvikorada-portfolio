
from PIL import Image
import numpy as np

img = Image.open(r'C:/Users/Thanvi/.gemini/antigravity/brain/1fa5a3d1-7f3d-4b5f-9a2f-5e59c14f4fd7/.user_uploaded/media_1789111975718.png').convert('RGBA')
arr = np.array(img)

# Green background is approx RGB(40, 140, 60) - let's see. 
# We'll just check if Green > Red + 20 and Green > Blue + 20
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
mask = (g > r + 30) & (g > b + 30) & (g > 100)

# Set alpha to 0 for background pixels
arr[mask, 3] = 0

# The robot is around the center. We can crop it to remove UI elements.
# The image is probably 1920x1080.
h, w = arr.shape[:2]
# crop middle
cropped = arr[h//4 : h*3//4, w//4 : w*3//4]

out = Image.fromarray(cropped)
out.save('public/assets/robot.png')
print('Robot cropped and keyed!')

