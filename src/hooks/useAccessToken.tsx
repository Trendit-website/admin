
export const useAccessToken = () => {
    const access_token = sessionStorage.getItem('access_token')
    return {
        token: access_token
    }
}