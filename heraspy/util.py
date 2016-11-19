import json
import numpy as np

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
