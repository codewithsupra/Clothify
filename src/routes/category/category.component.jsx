// src/routes/category/category.component.jsx

import { useParams } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
 const categoriesMap=useSelector(selectCategoriesMap);
  const { category } = useParams();
  const isLoading=useSelector(selectCategoriesIsLoading);
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category] || []);
  }, [category, categoriesMap]);

  return (
    <>
    <h2 className='category-title'>{category.toUpperCase()}</h2>
    <br></br>
    {
        isLoading ? (
        <Spinner />
         ):(
            <div className='category-container'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
            
        
    )}
    
   
    </>
    
  );
};

export default Category;
