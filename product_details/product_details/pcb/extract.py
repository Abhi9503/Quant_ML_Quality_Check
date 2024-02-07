import easyocr

# Initialize the EasyOCR reader
reader = easyocr.Reader(['en'])  # Change 'en' to the language of your choice

# Path to the image file
image_path = "apps/product_details/product_details/product_details/pcb/img.jpeg"

# Read the text from the image
result = reader.readtext(image_path)

# Print the extracted text
for detection in result:
    print(detection[1])  # Extracted text