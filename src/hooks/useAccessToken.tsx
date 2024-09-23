export const useAccessToken = () => {
  const access_token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("access_token")
      : null;
  return {
    token: access_token,
  };
};
