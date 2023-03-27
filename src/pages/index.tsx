import styles from "@/styles/Home.module.css";
import Header from "./head";
import Link from "next/link";
// import Test from '../components/test'
export default function Home() {
  return (
    <>
      {/* <Header title="Trang chủ" /> */}
      <main className={styles.main}>
        Trang chủ
        <Link href={"/page-admin"}>Admin</Link>
      </main>
    </>
  );
}
