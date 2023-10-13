import sendGuardedRequest from './request/guardedRequest';

export async function getUser(url: string) {
  const options: RequestInit = {
    credentials: 'include',
  };

  return sendGuardedRequest(url, options);
}
