from keras.callbacks import Callback
import json
import numpy as np
import requests
from functools import reduce

def get_json_type(obj):

    if isinstance(obj, np.ndarray):
        return obj.tolist()

    # if obj is any numpy type
    if type(obj).__module__ == np.__name__:
        return obj.item()

    # if obj is a python 'type'
    if type(obj).__name__ == type.__name__:
        return obj.__name__

    raise TypeError('Not JSON Serializable')

def to_json(config):
    return json.dumps(config, default=get_json_type)

def to_jsonable_dict(obj):
    return json.loads(to_json(obj))

class HeraCallback(Callback):
    '''
        A Keras callback
    '''

    def __init__(
            self,
            model_config,
            socket_connection,
            server_config,
            callbacks=[],
            queue_length=10
        ):
        self.model_config = model_config
        self.socket_connection = socket_connection
        self.server_address = 'http://' + server_config['domain'] + ':' +  str(server_config['port'])

        super(HeraCallback, self).__init__()

    def on_train_begin(self, logs={}):
        self.socket_connection.emit(
            'train-begin',
            {
                'model': to_jsonable_dict(self.model_config),
                'trainConfig': self.params,
                'kerasConfig': json.loads(self.model.to_json()),
            }
        )

    def on_train_end(self, logs={}):
        self.socket_connection.emit(
            'train-end',
            {
                'model': to_jsonable_dict(self.model_config),
            }
        )

    def on_epoch_begin(self, batch, logs={}):
        self.socket_connection.emit(
            'epoch-begin',
            {
                'model': to_jsonable_dict(self.model_config),
                'kerasConfig': to_jsonable_dict(self.model.to_json()),
            }
        )

    def on_batch_end(self, batch, logs={}):
        self.socket_connection.emit(
            'batch-end',
            {
                'model': to_jsonable_dict(self.model_config),
                'logs': to_jsonable_dict(logs)
            }
        )

    def on_epoch_end(self, batch, logs={}):
        requests.post(
            self.server_address + '/data',
            json={
                'model': to_jsonable_dict(self.model_config),
                'logs': to_jsonable_dict(logs),
                'outputs': to_jsonable_dict(get_model_outputs_map(self.model))
            }
        )


def get_model_outputs_map(model):

    def add_layer_outputs_to_map(current_map, layer):

        current_map[layer.name] = layer.get_weights()
        return current_map

    return reduce(
        add_layer_outputs_to_map,
        model.layers,
        {}
    )
