import {Modal, useMantineTheme} from "@mantine/core";
import styles from "../styles/OrderModel.module.css";
import {useState} from "react";
import {createOrder} from "../lib/order";
import toast, {Toaster} from "react-hot-toast";
import {useStore} from "../store/store";
import {useRouter} from "next/router";

export default function OrderModal({opened, setOpened, method}) {
    const theme = useMantineTheme();
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const resetCart = useStore(state => state.resetCart);
    const total = typeof window !== "undefined" && localStorage.getItem('total');
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = await createOrder({...formData, total, PaymentMethod: method});
        toast.success("new order has placed");
        resetCart();
        if(typeof window !== "undefined") localStorage.setItem('order', id);
        router.push(`/order/${id}`);
    };
    // noinspection JSValidateTypes
    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(null)}
            title={"cart"}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <input type="text" className={styles.field} name="name" required placeholder="Name"
                       value={formData?.name || ""} onChange={handleInput}/>
                <input type="text" className={styles.field} name="phone" required placeholder="Phone number"
                       onChange={handleInput}/>
                <textarea name="address" rows="3" placeholder="Address" onChange={handleInput}></textarea>
                <span>You will pay <span>$ {total}</span> on delivery</span>
                <button className={"btn"} type="submit">Place Order</button>
            </form>
            <Toaster/>
        </Modal>
    );
};
