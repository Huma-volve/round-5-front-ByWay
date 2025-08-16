import {useMutation} from '@tanstack/react-query'
import {signUp} from '@/api/auth-api'


/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp. 
 */
export function useSignUp() {
    const {mutate, error, isPending, data} = useMutation({
        mutationFn: signUp,
        onSuccess: (data)=>{
            console.log(data);
            /**
             * If data is success insert in local/session storage || Redirect to otp
             * if not (show user the message sent form server if not an error like (this user is already exists))
             */
        },
        onError: (error)=>{
            console.log(error.message);
        }
    })

    return {mutate, error, isPending, data}
}