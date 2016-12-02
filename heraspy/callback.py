'''
    The Hera Callback
'''

from __future__ import absolute_import
import json

from keras.callbacks import Callback
from heraspy.util import to_jsonable_dict
from heraspy.dispatchers.socketio import get_socketio_dispatcher
import requests
from heraspy.events import (
    TRAIN_BEGIN, TRAIN_END,
    EPOCH_BEGIN, EPOCH_END,
    BATCH_END
)

class HeraCallback(Callback):

    '''
        A Keras callback streaming data to a hera socket server
    '''

    def __init__(self, model_key, host, port, dispatch=None, hera_config=None):

        if dispatch is None:
            self.dispatch = get_socketio_dispatcher(host, port)
        else:
            self.dispatch = dispatch

        self.model_key = model_key
        self.api_url = 'http://{}:{}'.format(host, port)
        self.hera_config = hera_config
        self.current_epoch = 0
        self.batch_idx = 0
        super(HeraCallback, self).__init__()

    def on_train_begin(self, *args):
        self.dispatch(
            self.model_key,
            TRAIN_BEGIN,
            {
                'params': self.params,
                'modelJson': json.loads(self.model.to_json()),
            }
        )

    def on_train_end(self, *args):
        self.dispatch(
            self.model_key,
            TRAIN_END,
            None
        )

    def on_epoch_begin(self, epoch, *args):
        self.current_epoch = epoch
        self.dispatch(
            self.model_key,
            EPOCH_BEGIN,
            {
                'epoch': epoch,
                'batchIdx': self.batch_idx,
                'params': self.params
            }
        )

    def on_epoch_end(self, epoch, *args):

        kill_list = requests.get(self.api_url + '/kill-list').json()

        if self.model_key in kill_list:
            self.model.stop_training = True
            requests.post(
                self.api_url + '/kill',
                {'model': self.model_key}
            )

        self.dispatch(
            self.model_key,
            EPOCH_END,
            {
                'epoch': epoch,
                'params': self.params
            }
        )

    def on_batch_end(self, batch, logs):
        self.dispatch(
            self.model_key,
            BATCH_END,
            {
                'batch': batch,
                'epoch': self.current_epoch,
                'idx': self.batch_idx,
                'metricData': to_jsonable_dict(
                    dict([
                        (metric, logs[metric])
                        for metric in self.params['metrics']
                        if metric in logs
                    ])
                ),
            }
        )

        self.batch_idx += 1
