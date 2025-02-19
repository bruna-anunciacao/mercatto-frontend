import styles from "./page.module.scss";
import Header from "./ui/header/header";

export default function Home() {
  return (
    <section className={styles.page}>
      <Header loggedIn={false} />
      Inicio
    </section>
  );
}
