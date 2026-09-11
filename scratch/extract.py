
from rembg import remove
from PIL import Image

input_path = r'C:/Users/Thanvi/.gemini/antigravity/brain/1fa5a3d1-7f3d-4b5f-9a2f-5e59c14f4fd7/.user_uploaded/media_1789111975718.png'
output_path = r'public/assets/robot.png'

# Load image
img = Image.open(input_path)

# Crop the robot roughly from the screenshot
# Based on the uploaded image, it's near the center. We'll just pass the whole thing to rembg and it will remove the background!
out = remove(img)
out.save(output_path)
print('Robot extracted to', output_path)

