import success from "../../assets/images/icons/success.svg"
import rocket from "../../assets/images/icons/rocket.svg"
import { Link } from "react-router-dom"
const Success=()=>{
    return(
        <div className="w-[90%] lg:w-[50%] h-[100dvh] flex flex-col items-center justify-center gap-6 mx-auto text-center">
           
           <img src={success} alt="success" className="w-60 mb-6"/>
            <h1 className="font-medium text-[20px] lg:text-[32px]">You have successfully subscribed to the course: UI/UX Design</h1>
            <p className="font-medium text-[15px] lg:text-[24px] text-secondary">You Will Receive a confirmation email soon! </p>
       <div className="flex gap-3 items-center ">
        <img src={rocket} alt="rocket icon"/>
        <Link to="/" className="font-medium lg:text-[24px]"> Go to My Courses</Link>
       </div>
        </div>
    )
}
export default Success