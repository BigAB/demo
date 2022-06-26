import {
  switchMap,
  Subject,
  map,
  combineLatestWith,
  distinctUntilChanged,
  BehaviorSubject,
  combineLatest,
  startWith,
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
  status: 'pending',
  pagination: {
    page: 1,
    totalPages: 10,
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
  private searchResults$;

  constructor(private readonly usersService: UsersService) {
    super(defaultState);
    this.searchResults$ = this.state$.pipe(
      map((state) => state.pagination.page),
      distinctUntilChanged(),
      combineLatestWith(this.searches$.pipe(distinctUntilChanged())),
      switchMap(([page, search]) => {
        return this.usersService.getPaginatedList({ username: search }, page);
      })
    );
    this.internalState$ = combineLatest([
      this.searchResults$.pipe(startWith({ items: undefined, total_count: 0 })),
      this.pagination$,
    ]).pipe(
      map(([searchResults, pagination]) => {
        return {
          status: 'ready',
          users: searchResults?.items,
          usersCount: searchResults?.total_count,
          pagination: {
            page: pagination.page,
            totalPages: Math.ceil(searchResults?.total_count / 5),
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
