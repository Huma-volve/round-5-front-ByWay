import {useMutation} from '@tanstack/react-query'
import signUp from '@/api/auth-api'


/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp. 
 */
export function useSignUp() {
    const {mutate, error, isPending, data} = useMutation({
        mutationFn: (values:{}) => signUp(values),
        onSuccess: (data)=>{
            console.log(data);
        },
        onError: (error)=>{
            console.log(error.message);
        }
    })

    return {mutate, error, isPending, data}
}