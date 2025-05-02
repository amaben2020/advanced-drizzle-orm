import EventEmitter from 'node:events';

export const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
  console.log('started');
});
eventEmitter.on('start', (start, end) => {
  console.log(`started from the ${start} to the ${end}`);
});

// eventEmitter.emit('start');

const greetListener = (name) => {
  console.log(`Hello, ${name}!`);
};

// Add and remove an event listener
eventEmitter.on('greet', greetListener);
eventEmitter.emit('greet', 'Aadyaa');

eventEmitter.removeListener('greet', greetListener);
eventEmitter.emit('greet', 'Aadyaa'); // No output
