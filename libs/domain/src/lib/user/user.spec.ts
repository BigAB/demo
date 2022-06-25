import { isUser, User } from './user';

describe('User', () => {
  it('should work', () => {
    const mockUser: User = {
      login: 'bigaba44',
      id: 51411990,
      node_id: 'MDQ6VXNlcjUxNDExOTkw',
      avatar_url: 'https://avatars.githubusercontent.com/u/51411990?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/bigaba44',
      html_url: 'https://github.com/bigaba44',
      followers_url: 'https://api.github.com/users/bigaba44/followers',
      following_url:
        'https://api.github.com/users/bigaba44/following{/other_user}',
      gists_url: 'https://api.github.com/users/bigaba44/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/bigaba44/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/bigaba44/subscriptions',
      organizations_url: 'https://api.github.com/users/bigaba44/orgs',
      repos_url: 'https://api.github.com/users/bigaba44/repos',
      events_url: 'https://api.github.com/users/bigaba44/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/bigaba44/received_events',
    };
    expect(isUser(mockUser)).toEqual('domain-user');
  });
});
