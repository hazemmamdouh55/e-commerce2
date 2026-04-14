
export async function getcategories() {
    try {
        const resposne = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        if (!resposne.ok) { throw new Error(resposne.statusText + "error occuredd") }
        const data = await resposne.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}