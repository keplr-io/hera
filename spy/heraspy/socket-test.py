from socketIO_client import SocketIO, LoggingNamespace

with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
    socketIO.emit('YO WTF', 'here have some fucking data')
