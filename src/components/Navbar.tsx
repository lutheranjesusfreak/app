import NavButton from './NavButton';

function Navbar() {
  return (
    <div className="flex">
      <NavButton url='app/' search="" label="Home" />
      <NavButton url='app/' search="lsb" label="LSB" />
      <NavButton url='app/' search="bcp" label="BCP" />
      <NavButton url='app/' search="about" label="About" />
    </div>
  );
}

export default Navbar;
