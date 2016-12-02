#Hera

Train/evaluate a Keras model, get metrics streamed to a dashboard in your browser.

![demo](https://j.gifs.com/3lO37p.gif)

## Setting up

### Step 1. Plant the spy

**Install the package**

```

    pip install heraspy

```

**Add the callback**

```python

    herasCallback = HeraCallback(
        'model-key',
        'localhost',
        4000
    )

    model.fit(X_train, Y_train, callbacks=[herasCallback])

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


## Using RabbitMQ


By default hera uses socket.io for messaging - both from keras callback to server, and from server to dashboard. This is to minimize the number of things one needs to install before getting up and running with hera.

However, in production socket.io is outperformed by a number of alternatives, also it is good in general to decouple the server-client communication from the inter-process communitation (python -> node) so that each can be managed and optimized independently.

To demonstrate how this works Hera ships with the option to use rabbitMQ for interprocess communication. Here's how to use it.

**In your model file**

```python

    from heraspy.callback import HeraCallback
    from heraspy.dispatchers.rabbitmq import get_rabbitmq_dispatcher

    herasCallback = HeraCallback(
        'model-key', 'localhost', 4000,
        dispatch=get_rabbitmq_dispatcher(
          queue='[my-queue]',
          amqps_url='amqps://[user]:[pass]@my-amqp-address'
        )
    )

```


**In server/src/server.js**

Replace the only line in the file with
```js

    getServer({
        dispatcher: 'rabbitmq',
        dispatcherConfig: {
            amqpUrl: 'amqps://[user]:[pass]@my-amqp-address',
            amqpQueue: '[my-queue]'
        }
    }).start();


```

That's it! Now communication from the python process and the node webserver process goes through rabbitmq.

## Credits

Aside from the obvious ones:

- The dashboard is built on [React-Redux starter kit](https://github.com/davezuko/react-redux-starter-kit)
