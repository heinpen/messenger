import { cookies } from 'next/headers';
import refreshToken from '../request/refreshToken';
import sendRequest from '../request/request';

export async function hasActiveSession() {
  const token = cookies().get('ACCESS_TOKEN')?.value;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Cookie: `ACCESS_TOKEN=${token}`,
    },
  };

  try {
    const { message } = await sendRequest(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/token/validate`,
      options,
    );
    console.log(message);

    if (message === 'token is valid') return true;
    return false;
  } catch (error) {
    console.log((error as Error).message, '2');

    return false;
  }
}

export async function reactivateSession() {
  const token = cookies().get('REFRESH_TOKEN')?.value;
  console.log(token);
  try {
    const message = await refreshToken({
      headers: {
        Cookie: `REFRESH_TOKEN=${token}`,
      },
    });
    console.log(message, '123123');
    return { done: true, message };
  } catch (error) {
    console.log(error.message);
    return { done: false, error: (error as Error).message };
  }
}
