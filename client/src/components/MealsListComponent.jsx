import React from 'react';
import MealsComponent from './MealsComponent';
import shakshouka from "../assets/shakshouka.jpg";
import harira from "../assets/harira.jpg";
import kofte from "../assets/kofte.jpg";
import couscous from "../assets/couscous.jpg";

const products = [
    { image: couscous, altText: "Couscous", title: "Couscous", percentage: 15 },
    { image: harira, altText: "Harira", title: "Harira", percentage: 20 },
    { image: kofte, altText: "Kofte", title: "Kofte", percentage: 30 },
    { image: shakshouka, altText: "Shakshouka", title: "Shakshouka", percentage: 25 },
  ];
  
  const MealsListComponent = () => {
    return (
      <ul className="product-list">
        {products.map((product, index) => (
          <MealsComponent
            key={index}
            image={product.image}
            altText={product.altText}
            title={product.title}
            percentage={product.percentage}
          />
        ))}
      </ul>
    );
  };

  export default MealsListComponent;
  