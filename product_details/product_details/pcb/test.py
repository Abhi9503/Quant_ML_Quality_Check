import subprocess
def test():
    command = "python apps/product_details/product_details/product_details/pcb/yolov5/detect.py --source sites/quality.com/public/files/01_missing_hole_02.jpg --weights apps/product_details/product_details/product_details/pcb/yolov5/runs/train/pcb_1st4/weights/best.pt"
    subprocess.run(command, shell=True)
    return "Hello"
