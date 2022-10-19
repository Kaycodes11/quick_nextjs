import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import Pizza1 from "../assets/p1.jpg";
import {UilPhone} from "@iconscout/react-unicons";
import Image from "next/image";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.container}>
      {/*  left side */}
      <div className={styles.left}>
        <div className={styles.cherryDiv}>
          <span>More than faster</span>
          <Image src={Cherry} alt={"cherry"} width={40} height={25} />
        </div>

        <div className={styles.heroText}>
          <span>Be the fastest</span>
          <span>in delivering</span>
          <span>
            Your <span style={{ color: "var(--themeRed)" }}> Pizza</span>
          </span>
        </div>

        <span className={styles.miniText}>
          The mission is to filling your tummy with delicious food with fast and
          free delivery
        </span>

        <button className={`btn ${styles.btn}`}>Get Started</button>
      </div>
      {/*  right side */}
      <div className={styles.right}>

        <div className={styles.imageContainer}>
          <Image src={HeroImage} alt="hero-image" layout="intrinsic" />
        </div>

        <div className={styles.contactUs}>
          <span>Contact us</span>
          <div>
            <UilPhone color="white" />
          </div>
        </div>

        <div className={styles.Pizza}>
          <div>
            {/*to control width of the image used layout = "intrinsic" */}
            <Image src={Pizza1} alt={"pizza"} objectFit="cover" />
          </div>

          <div className={styles.details}>
            <span>Italian Pizza</span>
            <span>
              <span style={{ color: "var(--themeRed)" }}>$</span> 7.49</span>
          </div>

        </div>


      </div>
    </div>
  );
}
