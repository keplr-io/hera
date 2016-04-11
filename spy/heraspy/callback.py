from keras.callbacks import Callback

class HeraCallback(Callback):
    '''
        A Keras callback
    '''

    def __init__(
            self,
            model_config,
            socket_connection,
            callbacks=[],
            queue_length=10
        ):
        self.model_config = model_config
        self.socket_connection = socket_connection
        super(HeraCallback, self).__init__(callbacks, queue_length)

    def on_train_begin(self, logs={}):
        self.socket_connection.emit(
            'train-begin',
            self.model_config
        )

    def on_batch_end(self, batch, logs={}):
        self.socket_connection.emit(
            'batch-end',
            self.model_config,
            logs
        )

    def on_epoch_end(self, batch, logs={}):
        self.socket_connection.emit(
            'epoch-end',
            self.model_config,
            logs
        )

