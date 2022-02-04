import { BsPencilFill, BsXLg } from "react-icons/bs";
import { useEdit } from '../../contexts/EditContext';
import { ReadProductData, useProducts } from '../../contexts/ProductsContext';
import './table.css';

const Table = () => {
    const { products, deleteProduct } = useProducts();
    const { editProduct, editModeToggle } = useEdit();

    function handleDelete(id: string) { 
      //Deletar o produto - request delete     
      deleteProduct(id);
    }

    function handleUpdate(data: ReadProductData): void {
      //Passar os dados do produto que vai editar para o formulário
      editProduct(data);
      //atualizar o editMode
      editModeToggle(true);
    }

    return (
        <div className='container-list'>
          {/* Listando os produtos */}
          {products.map((product, index) => (
            <div className='container-product' key={index}>
              <div className='form-out-container'>
                <div className='product-content'>
                  <img src={"data:image/png;base64," + product.image?.img_code} alt={"image of id " + product.fileName} />
                  <h3>{product.name}</h3>
                  <p>R$ {product.price}</p>
                </div>
              </div>

              <div className='buttons-container'>
                <button className='update-button' onClick={() => handleUpdate(product)}><BsPencilFill size={15} /></button>
                <button className='delete-button' onClick={() => handleDelete(product._id)}><BsXLg size={15} /></button>
              </div>
            </div>               
          ))} 
        </div>                 
    )
}

export default Table;


                
                