import {useState} from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Pizza.module.css";
import {client, urlFor} from "../../lib/client";
import Image from "next/image";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import {useStore} from "../../store/store";
import toast, {Toaster} from 'react-hot-toast';

export default function Pizza({pizza}) {
    const src = urlFor(pizza.image).url();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(1);
    const handleQuantity = (type) => {
        type === "increment" ? setQuantity(prev => prev + 1) : quantity === 1 ? null : setQuantity(prev => prev - 1);
    };
    // add to cart function
    const addPizza = useStore(state => state.addPizza);
    const addToCart = () => {
        addPizza({...pizza, price: pizza.price[size], quantity, size});
        toast.success("pizza added to cart");
    };
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image loader={() => src} src={src} alt={""} layout={"fill"} unoptimized={true}
                           objectFit={"cover"}/>
                </div>
                {/*    right side */}
                <div className={styles.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>
                    <span><span style={{color: "var(--themeRed)"}}>$ </span>{pizza.price[size]}</span>
                    <div className={styles.size}>
                        <span>Size</span>
                        <div className={styles.sizeVariants}>
                            <div className={size === 0 ? styles.selected : ""} onClick={() => setSize(0)}>Small</div>
                            <div className={size === 1 ? styles.selected : ""} onClick={() => setSize(1)}>Medium</div>
                            <div className={size === 2 ? styles.selected : ""} onClick={() => setSize(2)}>Large</div>
                        </div>
                    </div>
                    {/*    quantity counter */}
                    <div className={styles.quantity}>
                        <span>Quality</span>
                        <div className={styles.counter}>
                            <Image onClick={() => handleQuantity("decrement")} src={LeftArrow} alt={""} height={20} width={20} objectFit="contain"/>
                            <span>{quantity}</span>
                            <Image onClick={() => handleQuantity("increment")} src={RightArrow} alt={""} height={20} width={20} objectFit="contain"/>
                        </div>
                    </div>
                    {/*  button */}
                    <div className={`btn ${styles.btn}`} onClick={addToCart}>Add to cart</div>
                </div>
                <Toaster />
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    );
    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: "blocking"
    }
}

export async function getStaticProps(context) {
    const {slug = ""} = context.params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current == '${slug}'][0]`
    );
    return {
        props: {pizza},
    };
}
