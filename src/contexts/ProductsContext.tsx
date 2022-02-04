import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

export interface ReadProductData {
    _id: string;
    name: string;
    price: string; 
    fileName?: string;
    image?: {
        file_id: string;
        img_code: string;
    };
    file?: File;  
}

export interface ProductData {
    _id: string;
    name: string;
    price: string; 
    file: File;  
}

interface ProductsContextProps {
    products: ReadProductData[];
    createProduct: (data: any) => Promise<void>;    
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (data: ReadProductData) => Promise<void>;
}

interface ProductsProvider {
    children: React.ReactNode;
}
//Criar context
const ProductsContext = createContext<ProductsContextProps>({} as ProductsContextProps)
//Funcionalidades do context
export function ProductsProvider({ children }: ProductsProvider) {
    const [products, setProducts] = useState<ReadProductData[]>([]);//Dados dos produtos do banco de dados
    const [state, setState] = useState<boolean>(false)//Variável utilizado para saber se o fetch terminou o processo

    useEffect(() => {
        //Realizando fetch do tipo GET para o back-end fornecer os dados para front-end
        fetch("http://127.0.0.1:80/products", { 
            method: 'GET',            
        })
        .then((res) => res.json())
        .then((data) => {
            //Armazenar os dados no products
            setProducts(data)        
        })
        //Realiza o fetch, cada vez que a varável "state" atualizar
    }, [state])

    async function createProduct(data: ProductData): Promise<void> {  
        //Passando os dados do formulário no formato FormData para enviar ao back-end      
        const newData = new FormData();
        newData.append("name", data.name);
        newData.append("price", data.price);
        newData.append("file", data.file);

        //Fetch do tipo POST para o back-end criar o produto no banco de dados        
        await fetch("http://127.0.0.1:80/products", { 
            method: 'POST',            
            body: newData,                       
        })
        .then((res) => res.json())
        .then((response) => {  
            //Avisar o usuário se conseguuiu criar ou não, com mensagem enviado pelo back-end           
            if (response.status === 200) { 
                //Mensagem de sucesso                
                toast(`${response.message}`, { autoClose: 2000 }) 
            } else {                
                //Mensagem de erro
                toast(`${response.message}`, { autoClose: 2000 })
            }    
        });
        //Terminou o fetch, atualizar o state para pegar os dados atualizados do banco de dados
        setState(!state);
    }

    async function deleteProduct(id: string): Promise<void> { 
        //Fetch do tipo DELETE para o back-end deletar o produto no banco de dados, passando id do produto na url       
        await fetch(`http://127.0.0.1:80/products/${id}`, { 
            method: 'DELETE',
            headers : new Headers({         
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
        .then((res) => res.json())
        .then((response) => {
            //Avisar o usuário se conseguuiu criar ou não, com mensagem enviado pelo back-end
            if (response.status === 200) {
                //Mensagem de sucesso
                toast(`${response.message}`, { autoClose: 2000 }) 
            } else {        
                //Mensagem de erro        
                toast(`${response.message}`, { autoClose: 2000 })
            }                
        });
        //Terminou o fetch, atualizar o state para pegar os dados atualizados do banco de dados
        setState(!state);
    }

    async function updateProduct(data: ReadProductData): Promise<void> {
        //Passando os dados do formulário no formato FormData para enviar ao back-end 
        const newData = new FormData();
        newData.append("_id", data._id);
        newData.append("name", data.name);
        newData.append("price", data.price);
        if (!!data.file) {
            //Tem imagem nova
            newData.append("file", data.file);
            newData.append("fileName", data.fileName!);
            newData.append("image_id", data.image!.file_id);
        } else {  
            //Não tem imagem    
            newData.append("fileName", data.fileName!);
            newData.append("image_id", data.image!.file_id);
        }    
           
        //Fetch do tipo PUT para o back-end Atualizar o produto no banco de dados, passando id do produto na url
        await fetch(`http://127.0.0.1:80/products/${data._id}`, { 
            method: 'PUT',
            body: newData                    
        })
        .then((res) => res.json())
        .then((response) => {
            //Avisar o usuário se conseguuiu criar ou não, com mensagem enviado pelo back-end
            if (response.status === 200) {
                //Mensagem de sucesso
                toast(`${response.message}`, { autoClose: 2000 }) 
            } else {          
                //Mensagem de erro      
                toast(`${response.message}`, { autoClose: 2000 })
            }     
        });
        //Terminou o fetch, atualizar o state para pegar os dados atualizados do banco de dados
        setState(!state);
    }

    return (
        // passando as funcionalidades necessárias para o context distribuir na aplicação
        <ProductsContext.Provider value={{ products, createProduct, deleteProduct, updateProduct }}>
            { children }
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    //useProducts() para utilizar o context
    const context = useContext(ProductsContext);

    return context;
}