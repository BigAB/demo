import { useSyncExternalStore, useMemo } from 'react';

interface Unsubscribe {
  (): void;
}

interface Store<T> {
  subscribe: (callback: (state: T) => void) => Unsubscribe;
  getSnapshot: () => T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const useStore = <T>(store: Store<T>) => {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const actions = useMemo(() => {
    const actions: Omit<typeof store, 'subscribe' | 'getSnapshot'> = {};

    for (const key in store) {
      if (
        key !== 'subscribe' &&
        key !== 'getSnapshot' &&
        typeof store[key] === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        actions[key] = (...args: unknown[]) => store[key]?.(...args);
      }
    }

    return actions;
  }, [store]);

  return [state, actions] as const;
};
