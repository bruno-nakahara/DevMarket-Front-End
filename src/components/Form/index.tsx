import { FormEvent, useState } from 'react';
import { ProductData, useProducts } from '../../contexts/ProductsContext';
import './form.css';

const Form = () => {
    const { createProduct } = useProducts()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        createProduct({ name, price } as ProductData)
        setName("")
        setPrice("")
    }

    return (
        <form action="http://127.0.0.1:80/products" onSubmit={handleSubmit}>

          <div className='input-container'>            
            <label htmlFor="name">Nome do produto</label>
            <input required name='name' id="name" type="text" onChange={(e) => setName(e.target.value)} placeholder='Digite o nome do produto' />
          </div>

          <div className='input-container'>            
            <label htmlFor="price">Preço do produto</label>
            <input required name='price' id="price" type="text" onChange={(e) => setPrice(e.target.value)} placeholder='Digite o preço do produto' />
          </div>

          <button className='submit-button' type="submit">Salvar</button>
        </form>
    )
}

export default Form;