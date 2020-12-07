import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Item.styles.css";

const Item = ({ item, deleteItem }) => {
  const categories = {
    red: "Красный",
    blue: "Синий",
    green: "Зелёный",
  };
  const handleClick = () => deleteItem(item._id);

  return (
    <div className="item" style={item.hidden && { display: "none" }}>
      <img key={item._id} src={item.image} alt="product" />
      <div className="aligned">{item.name}</div>
      <div>{`${item.price} руб.`}</div>
      <div>{categories[item.category]}</div>
      <div>{`${item.qty} шт.`}</div>
      <div className="delete" onClick={handleClick}>
        удалить{" "}
      </div>
    </div>
  );
};

export default connect(null, actions)(Item);
