

export async function getSpecificBrand(id: string) {
    try {

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);

        if (!response.ok) {
            throw new Error(response.statusText + "error occuredd");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch Error:", error);

        throw error;
    }
}