import React, { createContext, useContext, useEffect, useState } from "react";

export interface ProductData {
    id: string;
    name: string;
    price: string;
}

type CreateProductData = Omit<ProductData, "id">

interface productsContextProps {
    products: ProductData[];
    createProduct: (data: ProductData) => void;
}

interface ProductsProvider {
    children: React.ReactNode;
}

const ProductsContext = createContext<productsContextProps>({} as productsContextProps)

export function ProductsProvider({ children }: ProductsProvider) {
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:80/products", { 
            method: 'GET',
            headers : new Headers({         
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setProducts(data)        
        })
    }, [products])

    function createProduct(data: CreateProductData): void {
        fetch("http://127.0.0.1:80/products", { 
            method: 'POST',
            headers : new Headers({         
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((response) => {
            console.log(response)      
        })
    }

    return (
        <ProductsContext.Provider value={{ products, createProduct }}>
            { children }
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext);

    return context;
}