import NavButton from './navButton';

export default function Navbar() {
  return (
    <div className="flex">
      <NavButton url="./" label="Home" />
      <NavButton url="./lsb" label="LSB" />
      <NavButton url="./bcp" label="BCP" />
      <NavButton url="./about" label="About" />
    </div>
  );
}
