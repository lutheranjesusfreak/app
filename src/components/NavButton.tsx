import { Link } from 'react-router-dom';

interface NavButtonProps {
  url: string;
  search: string;
  label: string;
}

function NavButton(props: NavButtonProps) {
  const href = `${props.url}${props.search}`;
  return (
    <Link to={href} className="p-2 m-2 hover:text-gray-500 transition-colors">
      {props.label}
    </Link>
  );
}

export default NavButton;
