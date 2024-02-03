import frappe
from frappe.model.document import Document
import base64
import os
import tempfile
from frappe.utils.file_manager import save_file
from roboflow import Roboflow
import cv2
import numpy as np
from PIL import Image
import subprocess

class QualityInspection(Document):
    pass



@frappe.whitelist(allow_guest=True)
def object_defect_detection(image_data,prod_id):
    result=""
    prod_doc=frappe.get_doc("Product Information",prod_id)
    if(prod_doc.ml_model):
        if(prod_doc.ml_model=="Roboflow-Casting"):
            result=casting_obj_detection(image_data,prod_id)

    return result






def casting_obj_detection(image_data,prod_id):
    try:
        filename = 'product_image.png'
        content_type = 'image/png'
        image_data_decoded = base64.b64decode(image_data.split(',')[1])
        file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
        file_url = file_doc.file_url if file_doc else None

        quality_doc = frappe.new_doc("Quality Inspection")
        quality_doc.product__id = prod_id
        quality_doc.product_picture = file_url
        quality_doc.insert()
        quality_doc.save()
        
        
       # Save the image temporarily
        temp_dir = tempfile.gettempdir()
        temp_filename = os.path.join(temp_dir, 'temp_image.png')
        with open(temp_filename, 'wb') as temp_file:
            temp_file.write(image_data_decoded)

        # Convert the image to RGB (if it's in RGBA mode)
        img = Image.open(temp_filename)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
            img.save(temp_filename, format='PNG')

        # Initialize Roboflow
        rf = Roboflow(api_key="tYOmMkYZj1W6AScfD6I2")
        project = rf.workspace().project("metal_plate")
        model = project.version("1").model

        # Infer on the local temporary image
        prediction_response = model.predict(temp_filename, confidence=40).json()

        # Get the predictions from the response
        predictions = prediction_response.get('predictions', [])
        
        
        # Check if predictions are present
       # Check if predictions are present
        if predictions:
            # Load the original image
            original_image = cv2.imread(temp_filename)

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

            # Save the modified image
            annotated_filename = os.path.join(temp_dir, 'annotated_image.png')
            cv2.imwrite(annotated_filename, original_image)


            filename = 'annotated_image.png'
            content_type = 'image/png'
            with open(annotated_filename, 'rb') as annotated_file:
                image_data_decoded = annotated_file.read()

            file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
            file_url = file_doc.file_url if file_doc else None

            doc = frappe.get_doc("Quality Inspection", quality_doc.name)
            doc.output_product_image = file_url
            doc.save()
            docname=doc.name
            
            if(num_holes==16):
                prod_status="OK"
            else:
                prod_status="NOT OK"
                
            return {"docname":docname,"num_holes":num_holes,"prod_status":prod_status}   

        else:
            return "No predictions found"

    except Exception as e:
        frappe.msgprint(f"Error processing request: {str(e)}")
        return {'error': str(e)}








@frappe.whitelist(allow_guest=True)
def pcb_defect_detection(image_data):
    try:
        # Clone the YOLOv5 repository
        subprocess.run(["git", "clone", "https://github.com/ultralytics/yolov5.git"])

        # Rest of your code here

        return "Success"

    except Exception as e:
        return {'error': str(e)}