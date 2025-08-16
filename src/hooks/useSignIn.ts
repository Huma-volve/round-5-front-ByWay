import { signIn } from '@/api/auth-api';
import {useMutation} from '@tanstack/react-query'

/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp. 
 */
export function useSignIn() {
    const {mutate, error, isPending, data} = useMutation({
        mutationFn: signIn,
        onSuccess: (data)=>{
            console.log(data);
            /**
             * If data is success insert in local/session storage 
            */
        },
        onError: (error)=>{
            console.log(error.message);
        }
    })

    return {mutate, error, isPending, data}
}