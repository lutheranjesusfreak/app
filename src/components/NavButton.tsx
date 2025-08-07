import { Link } from 'react-router-dom';

interface NavButtonProps {
  url: string;
  label: string;
}

function NavButton(props: NavButtonProps) {
  return (
    <Link to={props.url} className="p-2 m-2 hover:text-gray-500 transition-colors">
      {props.label}
    </Link>
  );
}

export default NavButton;
