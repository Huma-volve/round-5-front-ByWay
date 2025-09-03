import { verifyOTP } from '@/api/auth-api';
import {useMutation} from '@tanstack/react-query'
import { toast } from 'react-toastify';

/**
 * When user signup app should set the auth + user's info in session or local storage || (cash) user's mail, redirect to otp. 
 */
export function useOTP() {
    const {mutate, error, isPending, data} = useMutation({
        mutationFn: verifyOTP,
        onSuccess: (data)=>{
            console.log(data);
            toast.success("Successfully Verified")
            /**
             * 
            */
        },
        onError: (error:any)=>{
            toast.error(error.response.data.message);
        
            console.log(error);
        }
    })

    return {mutate, error, isPending, data}
}