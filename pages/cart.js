import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Cart.module.css";
import {useStore} from "../store/store";
import toast, {Toaster} from "react-hot-toast";
import {urlFor} from "../lib/client";
import {useState} from "react";
import OrderModal from "../components/OrderModal";

export default function Cart() {
    const cartData = useStore(state => state.cart);
    const removePizza = useStore(state => state.removePizza);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const handleRemove = (id) => {
        removePizza(id);
        toast.error("Item removed")
    };
    const total = () => cartData.pizzas.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const handleOnDelivery = () => {
        setPaymentMethod(0);
        if (typeof window !== "undefined") window.localStorage.setItem('total', total());
    };

    return (
        <Layout>
            <div className={styles.container}>
                {/* details */}
                <div className={styles.details}>
                    {cartData.pizzas.length > 0 &&
                        <table className={styles.table}>
                            <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            </thead>
                            <tbody className={styles.tbody}>
                            {cartData.pizzas.map((pizza, i) => {
                                const src = urlFor(pizza.image).url();
                                return (
                                    <tr key={i}>
                                        <td className={styles.imageId}><Image loader={() => src} src={src} alt=""
                                                                              objectFit="cover" width={85}
                                                                              height={85}/></td>
                                        <td>{pizza.name}</td>
                                        <td>{pizza.size === 0 ? 'Small' : pizza.size === 1 ? 'Medium' : 'Large'}</td>
                                        <td>{pizza.price}</td>
                                        <td>{pizza.quantity}</td>
                                        <td>{pizza.price * pizza.quantity}</td>
                                        <td style={{color: "var(--themeRed)", cursor: "pointer"}}
                                            onClick={() => handleRemove(i)}>x
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    }
                </div>
                {/* summary */}
                <div className={styles.cart}>
                    <span>cart</span>
                    <div className={styles.cartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{cartData.pizzas.length}</span>
                        </div>

                        <div>
                            <span>Total</span>
                            <span>$ {total()}</span>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                        <button className="btn">Pay Now</button>
                    </div>

                </div>
            </div>
            <Toaster/>
            {/*  modal  */}
            <OrderModal opened={paymentMethod === 0} setOpened={setPaymentMethod} method={paymentMethod}/>
        </Layout>
    );
}
