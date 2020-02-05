import 'zone.js';

const logZone = Zone.current.fork({
  name: 'hook',
  onScheduleTask: (delegate, current, target, task) => {
    console.log('Scheduling', task.type, task.source);
    return delegate.scheduleTask(target, task);
  },
  onInvokeTask: (delegate, current, target, task) => {
    console.log('Invoking', task.type, task.source);
    return delegate.invokeTask(target, task);
  },
  onHasTask: (delegate, current, target, hasTaskState) => {
    console.log('hasTask state: ', hasTaskState);
    return delegate.hasTask(target, hasTaskState);
  },
});

const btn = document.querySelector('#btn1') as HTMLButtonElement;
btn.addEventListener('click', () => {
  logZone.run(() => {
    setTimeout(() => {
      console.log('DONE');
    }, 1000);
  });
});
