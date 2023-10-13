import { logoutUser } from '@/api/auth';
import { getUser } from '@/api/user';
import { User } from '@/types';
import useSWR, { SWRResponse } from 'swr';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';

export function useChats() {
  return useSWR(`${process.env.NEXT_PUBLIC_SERVER}/users/profile`, getUser);
}

export function useLogoutUser(): SWRMutationResponse<
  { done: boolean; message: string },
  any,
  `${string}/auth/logout`,
  never
> {
  return useSWRMutation(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/logout`,
    logoutUser,
  );
}

export function useUser() {
  return useSWR(`${process.env.NEXT_PUBLIC_SERVER}/users/profile`, getUser);
}

export function useGetUsers() {
  return useSWR(`${process.env.NEXT_PUBLIC_SERVER}/users`, getUser);
}

export function useSearchUsers(searchQuery: string): SWRResponse<User[], any> {
  return useSWR(
    `${process.env.NEXT_PUBLIC_SERVER}/users/search?searchQuery=${searchQuery}`,
    getUser,
  );
}
