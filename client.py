import socketio

sio = socketio.Client()
#sio.connect("http://localhost:3000")
sio.connect("http://www.ryankato.com:3000")

@sio.event
def connect():
    print("Connected to server")

@sio.event
def connect_error():
    print("Connection with server failed")

@sio.event
def disconnect():
    print("Disconnected from server")

@sio.event
def message(data):
    print(data)

if __name__ == "__main__":
    print("Starting main loop") 
    while True:
        input_str = input()
        if input_str == 'q':
            break
        sio.emit('message', input_str)
    
