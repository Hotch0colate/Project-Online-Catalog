export interface Product {
  id: number,
  product_name: string,
  product_price: number,
  image: string
}

export interface Cart {
  id: number,
  product_name: string,
  product_price: number,
  total_product: number
}

export interface CartArray {
  data?: Cart[]
}