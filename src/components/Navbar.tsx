import "@/css/components/Navbar.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="navbar-brand">Restaurant Guide</div>
      </Link>
    </nav>
  );
}
