import { NavLink } from 'react-router-dom';

interface NavButtonProps {
  url: string;
  label: string;
}

export default function NavButton(props: NavButtonProps) {
  return (
    <NavLink to={props.url} className="p-2 m-2 hover:text-gray-500 transition-colors nav-color">
      {props.label}
    </NavLink>
  );
}
