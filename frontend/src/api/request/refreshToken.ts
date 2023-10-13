export default async function refreshToken(options?: RequestInit) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/token/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        ...options,
      },
    );

    if (!response.ok) {
      // Handle non-successful response (e.g., show server-provided error message)
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Toking refreshing failed';
      throw new Error(errorMessage);
    }
    console.log('Token refreshed');
    return 'Token refreshed';
  } catch (error) {
    // Handle fetch errors (e.g., network issues)
    throw new Error((error as Error).message || 'Network error');
  }
}
