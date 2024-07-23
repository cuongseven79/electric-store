export const getCartFromClient = (cookie: string): string[] => {
  const cookieValue =
    cookie
      .split('; ')
      .find((row) => row.startsWith(`cart=`))
      ?.split('=')[1]
      ?.split('%2') || [];
  return cookieValue;
};
