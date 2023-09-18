
import { getUser } from '@/api/user';
import useSWR from 'swr';

export default function useUser() {
  return useSWR(`${process.env.NEXT_PUBLIC_SERVER}/users/profile`, getUser);
}
