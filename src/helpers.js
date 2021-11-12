export function throttle(f, t) {
  let lastCall;
  return function (...args) {
    let previousCall = lastCall;
    if (previousCall === undefined || Date.now() - previousCall > t) {
      lastCall = Date.now();
      f(...args);
    }
  };
}
