// src/routes/category/category.component.jsx

import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category] || []);
  }, [category, categoriesMap]);

  return (
    <>
    <h2 className='category-title'>{category.toUpperCase()}</h2>
    <br />
    <div className='category-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </>
    
  );
};

export default Category;
