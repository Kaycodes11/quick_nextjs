export const createOrder = async ({name, phone, address, total, status, PaymentMethod}) => {
    const res = await fetch("/api/order", {
        method: "POST", body: JSON.stringify({
            name, phone, address, total: parseFloat(total), status: 1, method: PaymentMethod
        })
    });
    return await res.json();
};
