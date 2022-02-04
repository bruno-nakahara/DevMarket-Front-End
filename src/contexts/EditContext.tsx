import React, { createContext, useContext, useState } from "react";
import { ReadProductData } from "./ProductsContext";

interface EditContextProps {
    product: ReadProductData;
    editModeToggle: (isEdit: boolean) => void;
    editMode: boolean;
    editProduct: (data: ReadProductData) => void;
}

interface EditProvider {
    children: React.ReactNode;
}
//Criar context
const EditContext = createContext<EditContextProps>({} as EditContextProps)

//Funcionalidades do context
export function EditProvider({ children }: EditProvider) {
    const [product, setProduct] = useState<ReadProductData>({} as ReadProductData);//Dados do produto que vai editar
    const [editMode, setEditeMode] = useState<boolean>(false);//variável para saber se vai editar ou não

    function editProduct(data: ReadProductData): void {
        setProduct(data)
    }

    function editModeToggle(isEdit: boolean): void {
        setEditeMode(isEdit)
    }

    return (
        // passando as funcionalidades necessárias para o context distribuir na aplicação
        <EditContext.Provider value={{ product, editMode, editProduct, editModeToggle }}>
            { children }
        </EditContext.Provider>
    )
}

export function useEdit() {
    //useEdit() para utilizar o context 
    const context = useContext(EditContext);

    return context;
}