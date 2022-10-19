import { UilFacebook, UilTwitter, UilYoutube } from "@iconscout/react-unicons";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <div className={styles.container}>
      <span>All Rights Reserved &#169;2022</span>
      <div className={styles.social}>
        <UilFacebook size={45} />
        <UilTwitter size={45} />
        <UilYoutube size={45} />
      </div>

      {/* logo */}
      <div className={styles.logo}>
        <Image src={Logo} alt={"Logo"} width={50} height={50} />
        <span>Fudo</span>
      </div>

    </div>
  );
}
