export async function getProduct() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        if (!response.ok) {
            throw new Error(response.statusText + "error occured in fetching product ")
        };
        const data = await response.json();
        return data;
    } catch (error) {
        return error
    }
}
