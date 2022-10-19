import {client} from "../../lib/client";
import Layout from "../../components/Layout";
import styles from "../../styles/Order.module.css";
import {UilBill, UilBox} from "@iconscout/react-unicons";
import Cooking from "../../assets/cooking.png";
import Spinner from "../../assets/spinner.svg";
import OnWay from "../../assets/onway.png";
import Image from "next/image";
import {useEffect} from "react";

export const getServerSideProps = async ({params}) => {
    const query = `*[_type == 'order' && _id == '${params.id}']`;
    const order = await client.fetch(query);
    return {
        props: {
            order: order[0]
        },
    };
};

export default function Orders({order}) {
    useEffect(() => {
        if(order.status > 3) localStorage.clear();
    }, [order]);
    return (
        <Layout>
            <div className={styles.container}>
                <span className={styles.heading}>Order in progress</span>
                <div className={styles.details}>
                    <div><span>Order Id</span><span>{order._id}</span></div>
                    <div><span></span><span></span></div>
                    <div><span>Customer Name</span><span>{order.name}</span></div>
                    <div><span>Phone</span><span>{order.phone}</span></div>
                    <div>
                        <span>Method</span><span>{order.method === 0 ? "Cash on delivery" : "Online Payment(Paid)"}</span>
                    </div>
                    <div><span>Total</span><span>$ {order.total}</span></div>
                </div>
                <div className={styles.statusContainer}>

                    <div className={styles.status}>
                        <UilBill width={50} height={50}/>
                        <span>Payment</span>
                        {order.method === 0 ? <span className={styles.pending}>On Delivery</span> :
                            <span className={styles.completed}>Completed</span>
                        }
                    </div>
                    <div className={styles.status}>
                        <Image src={Cooking} alt={"cooking"} width={50} height={50}/>
                        <span>Cooking</span>
                        {order.status === 1 && (
                            <div className={styles.spinner}>
                                <Image src={Spinner} alt="spinner"/>
                            </div>
                        )}
                        {order.status > 1 && (
                            <span className={styles.completed}>Completed</span>
                        )}
                    </div>

                    <div className={styles.status}>
                        <Image src={OnWay} alt={"onWay"} width={50} height={50}/>
                        <span>OnWay</span>
                        {order.status === 2 && (
                            <div className={styles.spinner}>
                                <Image src={Spinner} alt="spinner"/>
                            </div>
                        )}
                        {order.status > 2 && (
                            <span className={styles.completed}>Completed</span>
                        )}
                    </div>

                    <div className={styles.status}>
                        <UilBox width={50} height={50}/>
                        <span>Delivered</span>
                        {order.status === 3 && (
                            <div className={styles.spinner}>
                                <Image src={Spinner} alt="spinner"/>
                            </div>
                        )}
                        {order.status > 3 && (
                            <span className={styles.completed}>Completed</span>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );

}
