import frappe
from frappe.model.document import Document
# import base64
# import os
# import tempfile
# from frappe.utils.file_manager import save_file
# from roboflow import Roboflow
# import cv2
# import numpy as np
# from PIL import Image
# import subprocess
# from scipy.spatial.distance import euclidean
# from imutils import perspective
# from imutils import contours
# import imutils
# import re




class QualityInspection(Document):
    pass


# #This function is called when we capture image
# @frappe.whitelist(allow_guest=True)
# def object_defect_detection(image_data,prod_id):
#     result=""
#     prod_doc=frappe.get_doc("Product Information",prod_id)
#     if(prod_doc.ml_model):
#         if(prod_doc.ml_model=="Roboflow-Casting"):
#             result=casting_obj_detection(image_data,prod_id,prod_doc.ml_model)
#         elif(prod_doc.ml_model=="Yolo-Electronics"):
#             result=pcb_defect_detection(image_data, prod_id, prod_doc.ml_model)
#     return result


# # from ...pcb.pcbdetect import detect

# @frappe.whitelist(allow_guest=True)
# def pcb_defect_detection(image_data, prod_id, model_name):
#     try:
#         filename = 'product.png'
#         content_type = 'image/png'
#         image_data_decoded = base64.b64decode(image_data.split(',')[1])
#         file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
#         file_url1 = file_doc.file_url if file_doc else None

#         parent_folder_path="/home/poseidon/Quality-Inspection/apps/product_details/product_details/product_details/pcb/yolov5/runs/detect"
#         command =f"python /home/poseidon/Quality-Inspection/apps/product_details/product_details/product_details/pcb/yolov5/detect.py --source /home/poseidon/Quality-Inspection/sites/quality.com/public{file_url1} --weights /home/poseidon/Quality-Inspection/apps/product_details/product_details/product_details/pcb/yolov5/runs/train/pcb_1st4/weights/best.pt"
    
#         result = subprocess.run(command, shell=True, capture_output=True, text=True)
#         stderr_output = result.stderr
#         instances_to_count = ["missing_holes", "mousse_bit", "open_circuit", "short", "spur", "spurious_copper"]

#         counts = {}
#         for instance in instances_to_count:
#             pattern = rf'(\d+) {instance}'
#             matches = re.findall(pattern, stderr_output)
#             if(instance=="missing_holes"):
#                 instance="Missing Holes"
#             elif(instance=="mousse_bit"):
#                 instance="Mouce Bite"
#             elif(instance=="open_circuit"):
#                 instance="Open Circuit"
#             elif(instance=="short"):
#                 instance="Short"
#             elif(instance=="spur"):
#                 instance="Spur"
#             elif(instance=="spurious_copper"):
#                 instance="Spurious Copper"
#             counts[instance] = int(matches[0]) if matches else 0
            
#         if result.returncode == 0:
#             last_subdirectory = None
#             image_path = None
#             subdirectories = [os.path.join(parent_folder_path, d) for d in os.listdir(parent_folder_path) if os.path.isdir(os.path.join(parent_folder_path, d))]
#             if subdirectories:
#                 last_subdirectory = max(subdirectories, key=os.path.getmtime)
#                 files_in_last_subdirectory = os.listdir(last_subdirectory)
#                 image_files = [file for file in files_in_last_subdirectory if file.endswith((".jpg", ".jpeg", ".png"))]
#                 if len(image_files) == 1:
#                     image_path = os.path.join(last_subdirectory, image_files[0])
            
#             filename = 'annotated_image.png'
#             content_type = 'image/png'
#             with open(image_path, 'rb') as annotated_file:
#                 image_data_decoded = annotated_file.read()

#             file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
#             file_url2 = file_doc.file_url if file_doc else None
                
#             quality_doc = frappe.new_doc("Quality Inspection")
#             quality_doc.product__id = prod_id
#             quality_doc.product_picture = file_url1
#             quality_doc.output_product_image = file_url2
#             num_holes=0
           
            
#             defetc_count=0
#             for i in counts:
#                 if(counts[i]!=0):
#                     defetc_count+=1
            
#             prod_status = "OK" if defetc_count == 0 else "NOT OK"
            
#             quality_doc.product_status = prod_status
#             quality_doc.model_name = model_name
#             quality_doc.save()

#             docname = quality_doc.name

#             return {"docname":docname, "parameters": counts, "prod_status":prod_status}
            
#     except Exception as e:
#         return {"success": False, "error": str(e)}
   




# def casting_obj_detection(image_data, prod_id, model_name):
#     try:
#         filename = 'product_image.png'
#         content_type = 'image/png'
#         image_data_decoded = base64.b64decode(image_data.split(',')[1])
#         file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
#         file_url1 = file_doc.file_url if file_doc else None

#         # Save the image temporarily
#         temp_dir = tempfile.gettempdir()
#         temp_filename = os.path.join(temp_dir, 'temp_image.png')
#         with open(temp_filename, 'wb') as temp_file:
#             temp_file.write(image_data_decoded)

#         # Convert the image to RGB (if it's in RGBA mode)
#         img = Image.open(temp_filename)
#         if img.mode == 'RGBA':
#             img = img.convert('RGB')
#             img.save(temp_filename, format='PNG')

#         # Initialize Roboflow
#         rf = Roboflow(api_key="mFFLmIzFV3HfD6CZcAcA")
#         project = rf.workspace().project("casting-usyaw")
#         model = project.version("2").model
         
#         # Infer on the local temporary image
#         prediction_response = model.predict(temp_filename, confidence=40).json()

#         # Get the predictions from the response
#         predictions = prediction_response.get('predictions', [])

#         # Check if predictions are present
#         if predictions:
#               # Load the original image
#             original_image = cv2.imread(temp_filename)

#             # Initialize a counter for the number of holes
#             num_holes = 0
#             gray = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)
#             blur = cv2.GaussianBlur(gray, (9, 9), 0)

#             edged = cv2.Canny(blur, 50, 100)
#             edged = cv2.dilate(edged, None, iterations=1)
#             edged = cv2.erode(edged, None, iterations=1)

#             cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#             cnts = imutils.grab_contours(cnts)
#             cnts = [x for x in cnts if cv2.contourArea(x) > 100]
#             (cnts, _) = contours.sort_contours(cnts)

#             ref_object = cnts[0]
#             box = cv2.minAreaRect(ref_object)
#             box = cv2.boxPoints(box)
#             box = np.array(box, dtype="int")
#             box = perspective.order_points(box)
#             tl, tr, br, bl = box
#             cv2.drawContours(original_image, [box.astype("int")], -1, (0, 0, 255), 2)
#             dist_in_pixel = euclidean(tl, tr)
#             dist_in_cm = 11.2
#             pixel_per_cm = dist_in_pixel / dist_in_cm
            
#             # Iterate through predictions to find holes
#             for prediction in predictions:
#                 points = prediction.get('points', [])

#                 # Check if there are enough points to form a hole (at least 3 points)
#                 if len(points) >= 3:
#                     # Increment the counter for each hole found
#                     num_holes += 1

#                     rect = cv2.boundingRect(np.array([(int(p['x']), int(p['y'])) for p in points]))
#                     cv2.rectangle(original_image, (rect[0], rect[1]), (rect[0] + rect[2], rect[1] + rect[3]),
#                                 (0, 255, 0), 2)
#                     points_array = np.array([(int(p['x']), int(p['y'])) for p in points])
#                     rect = cv2.boundingRect(points_array)
#                     width = rect[2] / pixel_per_cm  # Convert width to cm
#                     font = cv2.FONT_HERSHEY_SIMPLEX
#                     font_scale = 0.5
#                     font_thickness = 1
#                     text_color = (0, 0, 0) 

#                     cv2.putText(original_image, f'd: {width:.2f} cm', (rect[0], rect[1] - 10),
#                                 font, font_scale, text_color, font_thickness)
                   
    

#             # Save the modified image
#             annotated_filename = os.path.join(temp_dir, 'annotated_image.png')
#             cv2.imwrite(annotated_filename, original_image)

#             filename = 'annotated_image.png'
#             content_type = 'image/png'
#             with open(annotated_filename, 'rb') as annotated_file:
#                 image_data_decoded = annotated_file.read()

#             file_doc = save_file(filename, image_data_decoded, 'Quality Inspection', content_type)
#             file_url2 = file_doc.file_url if file_doc else None

#             quality_doc = frappe.new_doc("Quality Inspection")
#             quality_doc.product__id = prod_id
#             quality_doc.product_picture = file_url1
#             quality_doc.output_product_image = file_url2

#             prod_status = "OK" if num_holes == 16 else "NOT OK"

#             quality_doc.product_status = prod_status
#             quality_doc.model_name = model_name
#             quality_doc.save()

#             docname = quality_doc.name

#             parameters = {
#                 "No of Holes": num_holes,
#             }

#             return {"docname": docname, "parameters": parameters, "prod_status": prod_status}

#         else:
#             return "No predictions found"

#     except Exception as e:
#         frappe.msgprint(f"Error processing request: {str(e)}")
#         return {'error': str(e)}
    


    
