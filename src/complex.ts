function main() {
  const btn1 = document.querySelector('#btn1') as HTMLButtonElement;
  btn1.addEventListener('click', btn1Handler);
}
function btn1Handler() {
  const btn2 = document.querySelector('#btn2') as HTMLButtonElement;
  btn2.addEventListener('click', btn2Handler);
  btn2.click();
}
function btn2Handler() {
  console.log('STARTING ASYNC ACTIONS');
  setTimeout(() => {
    console.log('1st timeout');
    setTimeout(() => {
      console.log('2nd timeout');
      setTimeout(() => {
        console.log('ALL DONE');
      }, 500);
    }, 500);
  }, 500);
}

main();

/*------------------------------------
          PROFILING ZONE
------------------------------------*/
import 'zone.js';
import 'zone.js/lib/zone-spec/long-stack-trace';

const profilingZone = (function() {
  let start = 0;
  return {
    name: 'perf',
    onScheduleTask: (delegate, current, target, task) => {
      if (task.type !== 'eventTask') {
        start = start || performance.now();
      }
      return delegate.scheduleTask(target, task);
    },

    onHasTask: (delegate, current, target, hasTaskState) => {
      if (!hasTaskState.macroTask && !hasTaskState.microTask && start) {
        console.log('Total time:', performance.now() - start);
      } else {
        start = performance.now();
      }
    },
  } as ZoneSpec;
})();

// Zone.current
//   // .fork(profilingZone)
//   // .fork((Zone as any).longStackTraceZoneSpec)
//   .run(main);
