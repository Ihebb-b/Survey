import { NavLink } from "react-router-dom";
import React from "react";

const MealsComponent = ({ image, altText, title, percentage }) => {
    return (
      <li className="product-item">
        <div className="product-card" tabIndex="0">
          <figure className="product-banner">
            <img src={image} alt={altText} />
            <NavLink to="/detailProduct">
              <button className="btn place-bid-btn">Show</button>
            </NavLink>
          </figure>
          <div className="product-content">
            <NavLink to="/detailProduct">
              <a className="h4 product-title">{title}</a>
            </NavLink>
            <div className="product-meta">
              <div className="mt-2 text-center">
                <p style={{ color: "#ffffff" }}>
                  The percentage of Mediterranean consumption of this item is
                </p>
              </div>
            </div>
            <div className="product-footer">
              <p className="total-bid">{percentage}%</p>
            </div>
          </div>
        </div>
      </li>
    );
  };

  export default MealsComponent;