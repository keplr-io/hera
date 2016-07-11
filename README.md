#Hera

Monitor your Keras models in realtime.


## TL;DR

Train/evaluate a Keras model, get metrics streamed to a dashboard in your browser.

## Setting up

### Step 1. Plant the spy

**Install the package**

```

    pip install heraspy

```

**Initialize the spy**

```python

    from heraspy.model import HeraModel

    hera_model = HeraModel(
        {
            'id': 'my-model' // any ID you want to use to identify your model
        },
        {
            // location of the local hera server, out of the box it's the following
            'domain': 'localhost',
            'port': 4000
        }
    )

```

**Plant the spy**

A spy admits a Keras callback that you can attach to your experiment. For example
```
    model.fit(
        X_train, Y_train,
        callbacks=[hera_model.callback]
    )
```

### Step 2. Start the server

Git clone this repository, then run

```

    cd server
    npm install
    node build/server
```


### Step 3. Start the dashboard

```

    cd client
    npm install
    npm start
```


## Credits

- [React-Redux starter kit](https://github.com/davezuko/react-redux-starter-kit)
- [React timeline charts](https://github.com/esnet/react-timeseries-charts)