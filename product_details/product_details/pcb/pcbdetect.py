import subprocess
import os

def detect(parent_folder_path):
    command = "python apps/product_details/product_details/product_details/pcb/yolov5/detect.py --source sites/quality.com/public/files/01_missing_hole_02.jpg --weights apps/product_details/product_details/product_details/pcb/yolov5/runs/train/pcb_1st4/weights/best.pt"
    subprocess.run(command)

    last_subdirectory = None
    image_path = None
    subdirectories = [os.path.join(parent_folder_path, d) for d in os.listdir(parent_folder_path) if os.path.isdir(os.path.join(parent_folder_path, d))]
    if subdirectories:
        last_subdirectory = max(subdirectories, key=os.path.getmtime)
        files_in_last_subdirectory = os.listdir(last_subdirectory)
        image_files = [file for file in files_in_last_subdirectory if file.endswith((".jpg", ".jpeg", ".png"))]
        if len(image_files) == 1:
            image_path = os.path.join(last_subdirectory, image_files[0])
    return command
