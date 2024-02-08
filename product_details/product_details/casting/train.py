import subprocess
command = "python apps/product_details/product_details/product_details/casting/yolov5/train.py --img 180 --batch 2 --epochs 10 --data apps/product_details/product_details/product_details/casting/yolov5/data.yaml --weights yolov5s.pt --cache --name casting_1st"
subprocess.run(command, shell=True)