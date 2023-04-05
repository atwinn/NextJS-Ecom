import styles from "@/styles/Home.module.css";
import "antd/dist/reset.css";
import Link from "next/link";

export default function Index() {
  return (
    <>
      {/* <Header title="Trang chủ" /> */}

      <main className={styles.main}>
        <Link href={"/sanpham"}>Trang chu</Link>
        <Link href={"/page-admin"}>Admin</Link>
      </main>
    </>
  );
}
