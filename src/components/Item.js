import React from "react";
import OrderStore from "../state/OrderStore";
import { view } from "@risingstack/react-easy-state";

const Item = view(({ name, id, value, checked }) => {
  const inputChange = (e) => {
    checked = e.target.checked; // used to be checked = !checked;
    console.log(`${value} is ${checked}`);

    for (let i = 0; i < OrderStore.items.length; i++) {
      if (OrderStore.items[i].id === id) {
        OrderStore.items[i].checked = checked;
        console.log(
          `state ${OrderStore.items[i].itemName} is ${OrderStore.items[i].checked}`
        );
      }
    }
  };

  return (
    <div className="item">
      <div className="item-div">
        <img src="https://picsum.photos/200" alt="menu item" />
      </div>
      <div className="item-div">{name}</div>
      <div className="item-div">
        <input
          id={id}
          className="checkbox"
          type="checkbox"
          value={value}
          checked={checked}
          onChange={inputChange}
        ></input>
      </div>
    </div>
  );
});

export default Item;
