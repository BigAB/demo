import { Octokit } from 'octokit';
import { User } from '@demo/domain';
const octokit = new Octokit({});

interface Query {
  username: string;
}

interface ListResponse {
  items: User[];
  total_count: number;
}

export const getPaginatedList = async (
  query: Query,
  page: number
): Promise<ListResponse> => {
  const result = await octokit.rest.search.users({
    q: query.username,
    page,
    per_page: 5,
  });

  const detailedUsers = await Promise.all(
    result.data.items.map(({ login }) =>
      octokit.rest.users.getByUsername({ username: login })
    )
  );
  result.data.items = result.data.items.map((user, i) => ({
    ...user,
    ...detailedUsers[i].data,
  }));
  return result.data;
};

export const getUser = async (username: string): Promise<User> => {
  const result = await octokit.rest.users.getByUsername({ username });
  return result.data;
};
