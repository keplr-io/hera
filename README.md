#Hera

Train/evaluate a Keras model, get metrics streamed to a dashboard in your browser.

![demo](https://cloud.githubusercontent.com/assets/1885277/16893637/1ab2e230-4b47-11e6-97cc-327b166a70f8.gif)

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
            'id': 'my-model' # any ID you want to use to identify your model
        },
        {
            # location of the local hera server, out of the box it's the following
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

Aside from the obvious ones:

- The dashboard is built on [React-Redux starter kit](https://github.com/davezuko/react-redux-starter-kit)
