from heraspy.callback import HeraCallback
from socketIO_client import SocketIO, LoggingNamespace

class HeraModel(object):

    '''
        Defines a model to be streamed to Hera
    '''

    def __init__(self, model_config, socket_config):
        self.model_config = model_config

        self.callback = HeraCallback(
            model_config,
            SocketIO(
                socket_config['domain'],
                socket_config['port'],
                LoggingNamespace
            )
        )
