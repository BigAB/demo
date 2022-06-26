export function Deferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolve,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reject,
    promise,
  };
}
