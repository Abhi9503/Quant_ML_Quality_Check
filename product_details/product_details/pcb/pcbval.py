import subprocess
command = "python apps/product_details/product_details/product_details/pcb/yolov5/val.py --weights apps/product_details/product_details/product_details/pcb/yolov5/runs/train/pcb_1st4/weights/best.pt --data apps/product_details/product_details/product_details/pcb/yolov5/1.yaml"
subprocess.run(command, shell=True)