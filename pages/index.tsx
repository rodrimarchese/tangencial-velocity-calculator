import { Calculator } from "../components/Calculator";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Calculator />
    </div>
  );
}
