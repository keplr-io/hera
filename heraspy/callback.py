'''
    The Hera Callback
'''

from __future__ import absolute_import
import json

from keras.callbacks import Callback
from heraspy.util import to_jsonable_dict

from heraspy.events import (
    TRAIN_BEGIN, TRAIN_END,
    EPOCH_BEGIN, EPOCH_END,
    BATCH_END
)

class HeraCallback(Callback):

    '''
        A Keras callback streaming data to a hera socket server
    '''

    def __init__(self, namespace, dispatcher, hera_config=None):

        self.dispatcher = dispatcher
        self.namespace = namespace
        self.hera_config = hera_config

        super(HeraCallback, self).__init__()

    def on_train_begin(self, *args):
        self.dispatcher(
            self.namespace,
            TRAIN_BEGIN,
            {
                'trainConfig': self.params,
                'modelJson': json.loads(self.model.to_json()),
            }
        )


    def on_train_end(self, *args):

        self.dispatcher(
            self.namespace,
            TRAIN_END,
            None
        )


    def on_epoch_begin(self, *args):

        self.dispatcher(
            self.namespace,
            EPOCH_BEGIN,
            None
        )

    def on_epoch_end(self, *args):
        self.dispatcher(
            self.namespace,
            EPOCH_END,
            {
                'logs': to_jsonable_dict(logs),
            }
        )

    def on_batch_end(self, batch, logs):

        self.dispatcher(
            self.namespace,
            BATCH_END,
            {
                'batch': batch,
                'metricData': to_jsonable_dict(
                    dict([
                        (metric, logs[metric])
                        for metric in self.params['metrics']
                        if metric in logs
                    ])
                ),
            }
        )
