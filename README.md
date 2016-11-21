#Hera

Train/evaluate a Keras model, get metrics streamed to a dashboard in your browser.

![demo](https://cloud.githubusercontent.com/assets/5866348/16719660/13460bee-46e2-11e6-8ab1-56873807390d.gif)

## Setting up

### Step 1. Plant the spy

**Install the package**

```

    pip install heraspy

```

**Add the callback**

```python

    from heraspy.callback import HeraCallback
    from heraspy.dispatchers.socketio_dispatcher import get_socket_dispatcher

    herasCallback = HeraCallback(
        'mnist-mlp',
        get_socket_dispatcher('mnist', 'localhost', '4000')
    )

    model.fit(
        X_train, Y_train,
        callbacks=[herasCallback]
    )
```

### Step 2. Start the server

Git clone this repository, then run

```

    cd server
    npm install
    gulp # optional, for now the build file is kept track in git
    node build/server
```


### Step 3. Start the dashboard

```

    cd client
    npm install
    npm start
```


## Credits

Aside from the obvious ones:

- The dashboard is built on [React-Redux starter kit](https://github.com/davezuko/react-redux-starter-kit)
