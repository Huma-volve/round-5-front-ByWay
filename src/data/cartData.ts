export interface cartProps {
  id?: string;
  course:{
  category_id?:number,
  title?: string;
  price?: string;
  status?:string;
  course_id?:number;
  video_url?:number;
  description?: string;
}
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  image: string;
  auther?: string;
  rate?: string;
  number_of_ratings?: number;
  // rating_img?: string;
}
// import shopping from "../assets/images/shopping cart.svg";
// import rating from "../assets/images/icons/rating.svg";
// const CART_DATA: CartProps[] = [
//   {
//     id: "1",
//     image: shopping,
//     title: "Graphic Design",
//     price: "400 EGP",
//     auther: "John Doe",
//     rate: "4.5",
//     rating_img: rating,
//     number_of_ratings: 250,
//     description: "22 Total Hours. 155 Lectures. All levels",
//   },
//   {
//     id: "2",
//     image: shopping,
//     title: "Advanced React",
//     price: "400 EGP",
//     auther: "Amira Mohamed",
//     rate: "4.6",
//     rating_img: rating,
//     number_of_ratings: 250,
//     description: "22 Total Hours. 155 Lectures. All levels",
//   },
//   {
//     id: "3",
//     image: shopping,
//     title: "Advanced React",
//     price: "500 EGP",
//     auther: "Jane Smith",
//     rate: "4.8",
//     rating_img: rating,
//     number_of_ratings: 300,
//     description: "22 Total Hours. 155 Lectures. All levels",
//   },
// ];

// export default CART_DATA;
