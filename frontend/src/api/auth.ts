import { LoginFormData } from '@/components/auth/LoginForm';
import { RegistrationFormData } from '@/components/auth/RegisterForm';
import sendGuardedRequest from './request/guardedRequest';
import refreshToken from './request/refreshToken';
import sendRequest from './request/request';

export async function loginUser(url: string, { arg }: { arg: LoginFormData }) {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
    credentials: 'include',
  };

  return sendRequest(url, options);
}

export async function logoutUser(url: string) {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
  };

  return sendGuardedRequest(url, options);
}

export async function registerUser(
  url: string,
  { arg }: { arg: RegistrationFormData },
) {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  };

  return sendRequest(url, options);
}



