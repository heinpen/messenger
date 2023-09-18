
import { getUser } from '@/api/user';
import useSWR from 'swr';

export default function useChats() {
  return useSWR(`${process.env.NEXT_PUBLIC_SERVER}/users/profile`, getUser);
}
