import refreshToken from './refreshToken';

async function sendRequest(url: string, options: RequestInit) {
  try {
    let response = await fetch(url, options);

    if (response.status === 401) {
      // If the request results in "Unauthorized," attempt token refresh
      await refreshToken();
      response = await fetch(url, options);
    }

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

export async function getUser(url: string) {
  const options: RequestInit = {
    credentials: 'include',
  };

  return sendRequest(url, options);
}


