const { Observable } = require('./Observable');
const observer = new Observable();

console.log("Starting observer");

const fn1 = num => console.log('fn1: ', num);
const fn2 = num => console.log('fn2: ', num);

observer.subscribe(fn1);
observer.subscribe(fn2);

const interval = setInterval(() => {
  const rnd = Math.round(Math.random() * 100);
  observer.notify(rnd);
}, 2500);
