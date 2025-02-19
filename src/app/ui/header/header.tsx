"use client";
// Components

// Images
import {
  Search,
  Person,
  ShoppingCart,
  Login,
  Logout,
} from "@mui/icons-material";
// Imports
import Image from "next/image";
import { Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
// Styles
import s from "./header.module.scss";

export default function Header({ loggedIn }: { loggedIn: boolean }) {
  const router = useRouter();
  return (
    <section className={s.wrapperHeader}>
      <a href="/" className={s.logo}>
        <Image
          src="/mercatto-logo.png"
          alt="Mercatto Logo"
          width={150}
          height={150}
          priority
        />
      </a>
      <nav className={s.wrapperNavbar}>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="#">Sobre nós</Link>
          </li>
          <li>
            <Link href="#">Contato</Link>
          </li>
          <li>
            <Link href="#">Ajuda/FAQ</Link>
          </li>
        </ul>
      </nav>
      <div className={s.searchBar}>
        <InputText
          id="searchBar"
          name="searchBar"
          placeholder="Buscar produtos"
          className={s.searchInput}
        />
        <button type="button">
          <Search sx={{ color: "#fff" }} />
        </button>
      </div>
      <div className={s.wrapperButtons}>
        {loggedIn ? (
          <>
            <Button startIcon={<Person />} className={s.profileButton}>
              Perfil
            </Button>
            <IconButton className={s.cartIcon} size="large">
              <ShoppingCart fontSize="large" />
            </IconButton>
            <IconButton className={s.logoutIcon} size="large">
              <Logout fontSize="large" />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              startIcon={<Person />}
              type="button"
              onClick={() => router.push("/register")}
              className={s.registerButton}
            >
              Criar Conta
            </Button>
            <Button startIcon={<Login />} className={s.loginButton}>
              Login
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
