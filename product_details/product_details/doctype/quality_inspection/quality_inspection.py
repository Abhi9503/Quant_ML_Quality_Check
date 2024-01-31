import frappe
from frappe.model.document import Document
import base64
from frappe.utils.file_manager import save_file
import os
from roboflow import Roboflow
import cv2
import numpy as np

class QualityInspection(Document):
    pass

@frappe.whitelist(allow_guest=True)
def model_computation(image_data):
    try:
        filename = 'product_image.png'
        content_type = 'image/png'
        image_data_decoded = base64.b64decode(image_data.split(',')[1])
        file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
        file_url = file_doc.file_url if file_doc else None

        quality_doc = frappe.new_doc("Quality Inspection")
        quality_doc.product__id = "PCB-38"
        quality_doc.product_picture = file_url
        quality_doc.save()
        
        
        
        from roboflow import Roboflow
        import cv2
        import numpy as np
        import base64

        # Initialize Roboflow
        rf = Roboflow(api_key="tYOmMkYZj1W6AScfD6I2")
        project = rf.workspace().project("metal_plate")
        model = project.version("1").model

        # Infer on a local image
        local_image_path = file_url
        prediction_response = model.predict(local_image_path, confidence=40).json()

        # Get the predictions from the response
        predictions = prediction_response.get('predictions', [])

        # Check if predictions are present
        if predictions:
            # Load the original image
            original_image = cv2.imread(local_image_path)

            # Initialize a counter for the number of holes
            num_holes = 0

            # Iterate through predictions to find holes
            for prediction in predictions:
                points = prediction.get('points', [])

                # Check if there are enough points to form a hole (at least 3 points)
                if len(points) >= 3:
                    # Increment the counter for each hole found
                    num_holes += 1

                    # Optionally, draw a bounding box around the hole for visualization
                    rect = cv2.boundingRect(np.array([(int(p['x']), int(p['y'])) for p in points]))
                    cv2.rectangle(original_image, (rect[0], rect[1]), (rect[0] + rect[2], rect[1] + rect[3]), (0, 255, 0), 2)



            # # Save the image with bounding boxes
            # cv2.imwrite("prediction_with_holes2.jpg", original_image)

            # Print the number of holes found
            print(f"Number of holes found: {num_holes}")
            print(f"Holes Missing : {16 - num_holes}")
        else:
            print("No predictions found in the response.")

            
            
        return image_data
    except Exception as e:
        frappe.msgprint(f"Error processing request: {str(e)}")
        
       