import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activecondition,
  index
}) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li key={index} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-bgsecondary text-bgprimary'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;