import Image from "next/image";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import styles from "../styles/Services.module.css";

export default function Services() {
  return (
    <>
      <div className={styles.heading}>
        <span>What We Serve</span>
        <span>Your Favourite Food</span>
        <span>Delivery Partner</span>
      </div>

      {/*    features */}
      <div className={styles.services}>
        <div className={styles.feature}>
          <div className={styles.ImageWrapper}>
            <Image
              src={s1}
              alt="service-1"
              objectFit="cover"
              layout="intrinsic"
            />
          </div>
          <span>Easy To Order</span>
          <span>You only need a few steps in food ordering</span>
        </div>

        <div className={styles.feature}>
          <div className={styles.ImageWrapper}>
            <Image
              src={s2}
              alt="service-2"
              objectFit="cover"
              layout="intrinsic"
            />
          </div>
          <span>Easy To Order</span>
          <span>Delivery that is always on time even faster</span>
        </div>
        <div className={styles.feature}>
          <div className={styles.ImageWrapper}>
            <Image
              src={s3}
              alt="service-3"
              objectFit="cover"
              layout="intrinsic"
            />
          </div>
          <span>Easy To Order</span>
          <span>Not only fast for us, quality is also number one</span>
        </div>
      </div>
    </>
  );
}
