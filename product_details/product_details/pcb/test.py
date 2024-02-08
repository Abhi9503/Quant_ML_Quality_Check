import subprocess
import re

def test():
    command = "python apps/product_details/product_details/product_details/pcb/yolov5/detect.py --source /home/poseidon/Quality-Inspection/sites/quality.com/public/files/product_imaged5be96.png --weights apps/product_details/product_details/product_details/pcb/yolov5/runs/train/pcb_1st4/weights/best.pt"
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        stderr_output = result.stderr
        instances_to_count = ["missing_holes", "mousse_bit", "open_circuit", "short", "spur", "spurious_copper"]
        counts = {}
        for instance in instances_to_count:
            pattern = rf'(\d+) {instance}'
            matches = re.findall(pattern, stderr_output)
            counts[instance] = int(matches[0]) if matches else 0
        for instance, count in counts.items():
            print(f"Number of {instance}: {count}")

    except subprocess.CalledProcessError as e:
        print("Error:", e)

test()