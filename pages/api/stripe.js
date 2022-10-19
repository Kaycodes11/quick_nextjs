import Stripe from 'stripe';
// noinspection JSCheckFunctionSignatures
const stripe = new Stripe(
    "sk_test_51JP7D8SGfKS6wLPgd3omKi5cxUYItRxKcsJ8YKRDYvSLhAEyAWAlW5Sn2MG5ZXsaLWGAV53kvpXs5uJ9ZEWxLzlI00Z1eTn1B0"
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body.map(item => {
                    const img = item.image.asset._ref;
                    const newImg = img.replace("image-", "https://cdn.sanity.io/images/76q7p0j0/production/").replace('-jpg', '.jpg');
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImg]
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {enabled: false},
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cart`
            };

            // checkout session
            // noinspection JSCheckFunctionSignatures
            const session = await stripe.checkout.sessions.create(params);
            console.log("session ", session);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("method is not allowed");
    }
}
