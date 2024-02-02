import subprocess
command = "python apps/product_details/product_details/product_details/pcb/yolov5/train.py --img 416 --batch 2 --epochs 350 --data apps/product_details/product_details/product_details/pcb/yolov5/1.yaml --weights yolov5s.pt --cache --name pcb_1st"
subprocess.run(command, shell=True)