import { useRouter } from "next/router"
import { useVerifyLogin } from "@/api/useVerifyLogin"
import { useEffect } from "react"
import toast from "react-hot-toast"
const VerifyLogin = () => {
    const router = useRouter()
    useEffect(() => {
        useVerifyLogin(router.query?.token)
        .then((response) => {
            console.log(response)
            toast.success(response.data?.message)
            sessionStorage.setItem('access_token', response.data?.access_token)
            router.push('/dashboard')
        })
        .catch((error) => {
            console.error(error)
            toast.error(error?.response?.data?.message)
            router.push('/Login')
        })
    }, [router.query.token])
    return (
        <div>

        </div>
    )
}
export default VerifyLogin