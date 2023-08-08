"use client";
import { Container, Nav, Navbar, NavDropdown } from "@/lib/bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export default function MainNavbar() {
  return (
    <Navbar className={styles.navbar} bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/img/logo.jpg" width={150} height={40} alt="logo" />
        </Navbar.Brand>
        <Nav>
          <NavDropdown title="Tabelas" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link className="dropdown-item" href="/cliente">
                Clientes
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
