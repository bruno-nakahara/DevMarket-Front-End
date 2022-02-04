import React, { FormEvent, useEffect, useState } from 'react';
import { BsEraserFill, BsCheck2, BsArrowBarUp, BsCheckCircle, BsFileEarmarkCheck } from "react-icons/bs";
import { useEdit } from '../../contexts/EditContext';
import { ProductData, ReadProductData, useProducts } from '../../contexts/ProductsContext';
import './form.css';

const initialState = {
  name: "",
  price: "",
};

const Form = () => {
    const { createProduct, updateProduct } = useProducts();
    const { product, editMode, editModeToggle, editProduct } = useEdit();
    const [state, setState] = useState(initialState);//Dados do novo produto ou produto editado
    const [file, setFile] = useState<File | null>();//Dados da imagem
    
    const { name, price } = state;

    function handleRefresh() {
      //Auto-refresh nos inputs
      setState(initialState);
      editModeToggle(false);
      editProduct({} as ReadProductData);
      setFile(null);
    }

    //Atualizando o state com produto que vai editar 
    useEffect(() => {
      if (editMode) {
        setState({...product})
      }
    }, [editMode])

    //Função para realizar submit, poderá ser tipo POST ou PUT
    function handleSubmit(): void {                 
        //Atualizar o produto no banco se estiver editando o produto
        if (editMode) {       
          if (file) {
            //Atualizar com imagem 
            updateProduct({...state, "_id": product._id, "file": file} as ReadProductData);
          } else {
            //Atualizar sem imagem
            updateProduct({...product, ...state} as ReadProductData);
          }          
           
          handleRefresh();
        } else {          
          //Criar produto no banco
          createProduct({...state, file} as ProductData);
          
          handleRefresh();
        }        
    }

    const handleOnChange = ((e: React.FormEvent<HTMLInputElement>) => {
      let { name, value } = e.currentTarget;
      //Atualizar os estados name e price
      setState({...state, [name]: value});
    })

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      //Verificar se o arquivo não está vazio para atualizar o estado do file
      if (e.target.files![0] !== null) {
        setFile(e.target.files![0]);
      }        
    }

    return (
        <form>
          <div className='form-out-container'>
            <div className='form-container'>
              <div className='input-container file-input'>
                  <input required type="file" accept="image/png, image/jpeg, image/jpg" name="file" id="file" onChange={handleFileChange} />
                  <label htmlFor="file">
                    <span>
                      {/* Mostrar para o usuário se fez upload de arquivo */}
                      {!!product.image ?
                      // Se está editando, mostrar icon indicando que já tem arquivo
                       (!!file ? <BsCheckCircle size={50} color='green'/> : <BsFileEarmarkCheck size={50} color='orange' />) :
                      //  Se não está editando, mostrar icon indicando para fazer upload
                       (!!file ? <BsCheckCircle size={50} color='green'/> : <BsArrowBarUp size={50} />)
                      }                    
                    </span> 
                    {/* Se tem arquivo, mostra o nome do arquivo. Se não tem arquivo mostra o texto  */}
                    {!!file ? file.name : "Upload de imagem"}                    
                  </label>
              </div>

              <div className='input-container input-name'>     
                <input required name='name' id="name" type="text" value={name || product.name || ""} onChange={handleOnChange} placeholder='Nome do Produto' />
              </div>

              <div className='input-container input-price'>            
                <input required name='price' id="price" type="text" value={price || product.price || ""} onChange={handleOnChange} placeholder='Preço' />
              </div>
            </div>
          </div>

          <div className='buttons-container'>
            <button className='submit-button' type="button" onClick={handleSubmit}><BsCheck2 size={20} /></button>
          
            <button className='refresh-button' onClick={handleRefresh}><BsEraserFill size={20} /></button>
          </div>
          
        </form>
    )
}

export default Form;