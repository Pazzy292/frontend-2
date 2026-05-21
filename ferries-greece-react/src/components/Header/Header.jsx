import TopHeader from "./TopHeader";
import MainNav from "./MainNav";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <TopHeader />
      <MainNav />
    </header>
  );
}
