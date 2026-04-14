import { Brand } from "./brand.interface"
import { Category } from "./categories.interface"
import { Subcategory } from "./Subcategory.interface"

export interface WishlistResponce {
    status: string
    count: number
    data: Daum[]
}

export interface Daum {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    priceAfterDiscount: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    __v: number
    id: string
}

