import NavButton from './NavButton';

function Navbar() {
  return (
    <div className="flex">
      <NavButton url='/' search="?currentTab=home" label="Home" />
      <NavButton url='/' search="?currentTab=lsb" label="LSB" />
      <NavButton url='/' search="?currentTab=about" label="About" />
    </div>
  );
}

export default Navbar;
