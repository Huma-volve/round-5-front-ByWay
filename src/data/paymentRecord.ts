export interface paymentRecord {
    id?: number,
    date: string,
    user_name: string,
    type:string,
    amount: number,
    status: string,
    payment_method: string,
}
export interface withdrowalDetails{
    id:number,
    instructor:string,
    date:string,
    amount:number,
    method:string,
    bankName:string,
    accountNumber:string,
    status:string,
}
export interface paymentDetails{
    id:number,
    instructor?:string,
    student?:string,
    request_date:string,
    payment_date?:string,
    course?:string,
    method:string,
    amount:number,
    status:string,
}
// export const PAYMENT_RECORDS: paymentRecord[] = [
//     {
//         id: 1,
//         date: "2023-10-01",
//         name: "John Doe",
//         type: "Course Payment",
//         amount: 100,
//         status: "Completed",
//         method: "Credit Card",
//         action: "View"
//     },
//     {
//         id: 2,
//         date: "2023-10-02",
//         name: "Jane Smith",
//         type: "Course Payment",
//         amount: 150,
//         status: "Pending",
//         method: "PayPal",
//         action: "View "
//     },
//     {
//         id: 3,
//         date: "2023-10-03",
//         name: "Alice Johnson",
//         type: "Course Payment",
//         amount: 200,
//         status: "Failed",
//         method: "Bank Transfer",
//         action: "View "
//     }
// ];


export const WITHDROWAL_DETAILS: withdrowalDetails = 
    {
        id: 1,
        instructor: "Nour Ali",
        date: " 27 Jul 2025",
        amount: 150,
        method: "Bank Transfer",
        bankName: "CIB",
        accountNumber: "****1234",
        status: "Pending"
    }
 

// export const PAYMENT_DETAILS: paymentDetails = 
//     {
//         id: 1,
//         student: " Salma Ahmed",
//         date: "27 Jul 2025",
//         course: "UI/UX Design Basics ",
//         method: "Visa",
//         amount: 95,
//         status: "Completed"
//     }
