import NavButton from './NavButton';

function Navbar() {
  return (
    <div className="flex">
      <NavButton url="./" label="Home" />
      <NavButton url="./lsb" label="LSB" />
      <NavButton url="./bcp" label="BCP" />
      <NavButton url="./about" label="About" />
    </div>
  );
}

export default Navbar;
