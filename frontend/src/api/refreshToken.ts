export default async function refreshToken() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );
    console.log(await response.json());

    if (!response.ok) {
      // Handle non-successful response (e.g., show server-provided error message)
      const responseData = await response.json();
      const errorMessage = responseData.message || 'Toking refreshing failed';
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Handle fetch errors (e.g., network issues)
    throw new Error((error as Error).message || 'Network error');
  }
}
