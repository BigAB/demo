import { BehaviorSubject, Observable } from 'rxjs';

interface Unsubscribe {
  (): void;
}

export class BaseStore<State> {
  protected state$: BehaviorSubject<State>;
  protected internalState$?: Observable<State>;

  constructor(defaultState: State) {
    this.state$ = new BehaviorSubject<State>(defaultState);
  }

  subscribe = (callback: (state: State) => void): Unsubscribe => {
    if (!this.internalState$) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    const sub = this.internalState$.subscribe(this.state$);
    const subscription = this.state$.subscribe(callback);
    sub.add(subscription);
    return () => sub.unsubscribe();
  };

  getSnapshot = () => this.state$.getValue();
}
