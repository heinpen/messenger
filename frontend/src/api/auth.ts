import { LoginFormData } from '@/components/auth/LoginForm';
import { RegistrationFormData } from '@/components/auth/RegisterForm';

async function sendRequest(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Handle non-successful response (e.g., show server-provided error message)
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Request failed';
      throw new Error(errorMessage);
    }

    // Parse and return response data if needed
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle fetch errors (e.g., network issues)
    throw new Error((error as Error).message || 'Network error');
  }
}

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

  return sendRequest(url, options);
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
