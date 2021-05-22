
import { NavLink, Flex } from 'theme-ui'

export function Nav(): React.ReactElement {
  return (
    <Flex as="header" variant="header">
      <NavLink href="#!" p={2}>
        Home
  </NavLink >
      <NavLink href="#!" p={2}>
        Blog
  </NavLink>
      <NavLink href="#!" p={2}>
        About
  </NavLink>
    </Flex >
  );
}
