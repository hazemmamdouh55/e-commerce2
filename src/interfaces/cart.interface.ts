import { Product } from './cart.interface';
export interface CartResponce {
    status: string
    numOfCartItems: number
    cartId: string
    data: CartDetail
}

export interface CartDetail {
    _id: string
    cartOwner: string
    products: ProductCart[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface ProductCart {
    count: number
    _id: string
    product: Product
    price: number
}


