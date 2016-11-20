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
        self.current_epoch = 0
        self.batch_idx = 0

        super(HeraCallback, self).__init__()

    def on_train_begin(self, *args):
        self.dispatcher(
            self.namespace,
            TRAIN_BEGIN,
            {
                'params': self.params,
                'modelJson': json.loads(self.model.to_json()),
            }
        )


    def on_train_end(self, *args):

        self.dispatcher(
            self.namespace,
            TRAIN_END,
            None
        )


    def on_epoch_begin(self, epoch, *args):
        self.current_epoch = epoch
        self.dispatcher(
            self.namespace,
            EPOCH_BEGIN,
            {
                'epoch': epoch,
                'batchIdx': self.batch_idx,
                'params': self.params
            }
        )

    def on_epoch_end(self, epoch, *args):
        self.dispatcher(
            self.namespace,
            EPOCH_END,
            {'epoch': epoch}
        )

    def on_batch_end(self, batch, logs):
        self.dispatcher(
            self.namespace,
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

