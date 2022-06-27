import {
  switchMap,
  Subject,
  map,
  combineLatestWith,
  distinctUntilChanged,
  BehaviorSubject,
  combineLatest,
  from,
  concat,
  Observable,
  of,
  withLatestFrom,
  catchError,
} from 'rxjs';
import { User } from '@demo/domain';
import { BaseStore } from '@demo/stores/base-store';

interface State {
  status: 'pending' | 'ready' | 'error';
  users?: readonly User[];
  usersCount?: number;
  pagination: {
    page: number;
    totalPages: number;
  };
  errors?: readonly string[];
}

const defaultState: State = {
  status: 'ready',
  users: undefined,
  usersCount: 0,
  pagination: {
    page: 1,
    totalPages: 0,
  },
};

interface UsersService {
  getPaginatedList(
    query: { username: string },
    page: number
  ): Promise<{ items: readonly User[]; total_count: number }>;
}

export class UsersStore extends BaseStore<State> {
  private readonly searches$ = new Subject<string>();
  private readonly pagination$ = new BehaviorSubject(defaultState.pagination);
  private searchResults$: Observable<Partial<State>>;

  constructor(private readonly usersService: UsersService) {
    super(defaultState);
    this.searchResults$ = this.state$.pipe(
      map((state) => state.pagination.page),
      distinctUntilChanged(),
      combineLatestWith(this.searches$.pipe(distinctUntilChanged())),
      switchMap(([page, search]) => {
        return concat(
          of({ status: 'pending' as const }),
          from(
            this.usersService.getPaginatedList({ username: search }, page)
          ).pipe(
            map((response) => ({
              status: 'ready' as const,
              users: response.items,
              usersCount: response.total_count,
            })),
            catchError((err) => {
              return of({ status: 'error' as const, errors: [err.message] });
            })
          )
        );
      })
    );
    this.internalState$ = combineLatest([
      this.searchResults$,
      this.pagination$,
    ]).pipe(
      withLatestFrom(this.state$),
      map(([[searchResults, pagination], state]) => {
        return {
          ...state,
          ...searchResults,
          pagination: {
            page: pagination.page,
            totalPages: Math.ceil((searchResults?.usersCount || 0) / 5),
          },
        };
      })
    );
  }

  updatePagination = (
    updateFn: (state: State['pagination']) => State['pagination']
  ) => {
    this.pagination$.next(updateFn(this.pagination$.value));
  };

  searchUsersByUsername = (username: string) => this.searches$.next(username);
}
