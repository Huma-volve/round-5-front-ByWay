import { Link } from "react-router-dom";

export default function Home() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>

      {/* Instructor pages */}
      <Link to="/instructor/reviews">Instructor Reviews</Link>
      <Link to="/instructor/revenue">Revenue</Link>
      <Link to="/instructor/get-paid">Get Paid</Link>

      {/* Other pages */}
      <Link to="/favourites">Favourites</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/settings/paymethod">Pay Method</Link>
      <Link to="/settings/payhistory">Pay History</Link>
            
    </nav>
  );
}
