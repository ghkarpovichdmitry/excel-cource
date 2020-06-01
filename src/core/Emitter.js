export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // уведомляем слушателей, если они есть
  // table.emit('table:select', {a:1}
  emit(event, ...args) { // fe 'formula:done'
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    });
    return true;
  }

  // on, listen
  // подписываемся на уведомления = добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    // функция для отписки от события
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    }
  }
}

// Example
// const emitter = new Emitter();
// const unsub = emitter
// .subscribe('vladilen', data => console.log('Sub:', data));
//
// emitter.emit('vladilen', 420);
// emitter.emit('123', 420);
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 2 seconds')
// }, 2000);
//
// setTimeout(() => {
//   unsub();
// }, 3000);
//
// setTimeout(() => {
//   emitter.emit('Vladilen', 'After 4 seconds')
// }, 4000);
