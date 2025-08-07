interface NavButtonProps {
  url: string;
  search: string;
  label: string;
}

function NavButton(props: NavButtonProps) {
  const href = `${props.url}${props.search}`;
  return (
    <a href={href} className="p-2 m-2 hover:text-gray-500 transition-colors">
      {props.label}
    </a>
  );
}

export default NavButton;
