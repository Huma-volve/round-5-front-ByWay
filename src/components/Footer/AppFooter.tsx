import { Link } from "react-router-dom";

function AppFooter() {
  return (
    <footer className="bg-footer py-6 my-10">
      <div className="container flex flex-col gap-2">
        <div className="footer-item gap-2">
          <Link to="/">
            <img className="fill-white" src="/logo-text.svg" alt="" />
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus fugit
            quam molestiae,
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus fugit
            quam molestiae, qui amet sapiente
          </p>
        </div>
        <nav>
          <ul className="footer-item">
            <h2 className="footer-header">Get Help</h2>
            <li className="link-group">
                <Link to="/">Contact Us</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Contact Us</Link>
            </li>
          </ul>
          <ul className="footer-item">
            <h2 className="footer-header">Programs</h2>
            <li className="link-group">
                <Link to="/">Contact Us</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Contact Us</Link>
            </li>
          </ul>
          <ul className="footer-item">
            <h2 className="footer-header">Contact Us</h2>
            <address>Address: 123 Main Street, Anytown,CA 12345</address>
            <p>Tel: +(123) 456-7890</p>
            <p>Mail: bywayedu@webkul.in</p>
            <div className="social-group"></div>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default AppFooter;
