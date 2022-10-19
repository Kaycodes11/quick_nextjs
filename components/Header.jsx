import {useState, useEffect} from "react";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import {UilReceipt, UilShoppingBag} from "@iconscout/react-unicons";
import styles from "../styles/Header.module.css";
import {useStore} from "../store/store";
import Link from "next/link";

export default function Header() {
    const [order, setOrder] = useState("");
    const state = useStore(state => state);
    const cartItems = useStore(state => state.cart.pizzas.length);
    useEffect(() => {
        setOrder(localStorage.getItem('order'));
    }, []);
    return (
        <div className={styles.header}>
            {/* logo */}
            <div className={styles.logo}>
                <Image src={Logo} alt={"Logo"} width={50} height={50}/>
                <span>Fudo</span>
            </div>

            {/* menu side */}
            <ul className={styles.menu}>
                <li>
                    <Link href={"../"}>Home</Link>
                </li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            {/* cart side */}
            <div className={styles.rightSide}>
                <Link href='/cart'>
                    <div className={styles.cart}>
                        <UilShoppingBag size={35} color="#2E2E2E"/>
                        <div className={styles.badge}>{cartItems}</div>
                    </div>
                </Link>
                {order && (
                    <Link href={`/order/${order}`}>
                        <div className={styles.cart}>
                            <UilReceipt size={35} color="#2E2E2E"/>
                            {order !== "" && <div className={styles.badge}>11</div>}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
