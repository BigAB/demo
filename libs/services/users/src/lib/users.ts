import { Octokit } from 'octokit';
import { User, isUser } from '@demo/domain';
const octokit = new Octokit({});

interface Query {
  username: string;
}

export const getPaginatedList = async (
  query: Query,
  page: number
): Promise<readonly User[]> => {
  const result = await octokit.request('GET /search/users', {
    q: query.username,
    page,
  });
  return result.data.items.filter(isUser) as readonly User[];
};
