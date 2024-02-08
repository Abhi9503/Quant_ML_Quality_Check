import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

# Open the image file
image = Image.open('/home/poseidon/Quality-Inspection/apps/product_details/product_details/product_details/pcb/img.jpeg')

# Use pytesseract to do OCR on the image
text = pytesseract.image_to_string(image)

# Print the extracted text
print(text)