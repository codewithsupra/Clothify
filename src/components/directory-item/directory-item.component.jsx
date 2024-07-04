import React from "react";
import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles.jsx';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(`/shop/${title.toLowerCase()}`);

  return (
    <DirectoryItemContainer className="directory-item-container" onClick={onNavigateHandler}>
      <BackgroundImage className="background-image" imageUrl={imageUrl} />
      <Body className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
