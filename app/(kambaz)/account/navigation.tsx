"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink as={Link} href={link} active={pathname.endsWith(link)}>
            {link}{" "}
          </NavLink>{" "}
        </NavItem>
      ))}
    </Nav>
  );
}
