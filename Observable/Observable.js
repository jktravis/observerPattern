const uuid = require('uuid');

exports.Observable = function Observable() {
  const subscriptions = {};

  return {
    subscribe(fn) {
      if (fn) {
        const id = uuid.v4();
        subscriptions[id] = fn;
        return id;
      }
    },
    unsubscribe(id) {
      delete subscriptions[id];
    },
    notify(...args) {
      Object.keys(subscriptions).forEach(id => {
        subscriptions[id](...args);
      })
    },

    getSubscriptions() {
      return Object.keys(subscriptions);
    }

  }
};

