const { Observable } = require('./Observable');
const observer = new Observable();

console.log("Starting observer");

const fn1 = num => console.log('fn1: ', num + 10);
const fn2 = num => console.log('fn2: ', num * 2);

observer.subscribe(fn1);
observer.subscribe(fn2);

const interval = setInterval(() => {
  const rnd = Math.round(Math.random() * 100);
  observer.notify(rnd);
}, 2500);


setInterval(() => {
  console.log();
  console.log("#################");
  console.log('Adding another subscriber');
  console.log();
  const id = observer.subscribe((num) => console.log('fn3: ', num - 2));

  setTimeout(() => {
    console.log();
    console.log("#################");
    console.log('Removing last subscription');
    console.log();
    observer.unsubscribe(id);
  }, 4000);
}, 6000);
