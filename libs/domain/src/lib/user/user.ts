import { URLString } from '../url/url';

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: URLString;
  gravatar_id: string | null;
  url: URLString;
  html_url: URLString;
  followers_url: URLString;
  following_url: URLString;
  gists_url: URLString;
  starred_url: URLString;
  subscriptions_url: URLString;
  organizations_url: URLString;
  repos_url: URLString;
  events_url: URLString;
  received_events_url: URLString;

  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  name?: string | null;
  bio?: string | null;
  email?: string | null;
  location?: string | null;
  hireable?: boolean | null;
  blog?: string | null;
  company?: string | null;
}

const requiredProperties = [
  'avatar_url',
  'events_url',
  'followers_url',
  'following_url',
  'gists_url',
  'gravatar_id',
  'html_url',
  'id',
  'node_id',
  'login',
  'organizations_url',
  'received_events_url',
  'repos_url',
  'site_admin',
  'starred_url',
  'subscriptions_url',
  'type',
  'url',
  'score',
];

export const isUser = (obj: unknown): obj is User => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    requiredProperties.every((prop) => prop in obj) // &&
    // requiredProperties
    //   .filter((prop) => prop.endsWith('_url'))
    //   .every(
    //     (prop) =>
    //       prop in obj &&
    //       typeof obj[prop] === 'string' &&
    //       obj[prop].startsWith('https://')
    //   )
  );
};
