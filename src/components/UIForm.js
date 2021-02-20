import React, { useEffect } from "react";
import Item from "./Item";
import axios from "axios";
import OrderStore from "../state/OrderStore";
import { view } from "@risingstack/react-easy-state";

const UIForm = view(({ items }) => {
  let baseUrl = process.env.REACT_APP_BASEURL;
  const getMenu = async () => {
    const menuItems = await axios.get(`${baseUrl}/items`);
    for (let i = 0; i < menuItems.data.length; i++) {
      OrderStore.items.push({
        itemName: menuItems.data[i].name,
        id: menuItems.data[i].id,
        checked: false,
      });
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  let setInput = (e) => {
    OrderStore.TableNum = e.target.value;
  };

  let setOrder = async (e) => {
    e.preventDefault();

    for (let i = 0; i < OrderStore.items.length; i++) {
      if (OrderStore.items[i].checked === true) {
        const res = await fetch(`${baseUrl}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drink: OrderStore.items[i].itemName,
            tableNum: OrderStore.TableNum,
          }),
        });
        const data = await res.json();
        console.log(data);
      } //If statement ends
      OrderStore.items[i].checked = false;
      console.log(
        `${OrderStore.items[i].itemName} is ${OrderStore.items[i].checked} `
      );
    } // For statement ends
    OrderStore.TableNum = "";
  };

  return (
    <div className="item-container">
      <form onSubmit={setOrder}>
        {OrderStore.items.map((item) => (
          <Item
            key={item.id}
            name={item.itemName}
            checked={item.checked}
            value={item.itemName}
            id={item.id}
          />
        ))}

        <div className="submit-div">
          <label htmlFor="tableNum" className="table-label">
            Table Number
          </label>
          <input
            type="text"
            name="tableNum"
            value={OrderStore.TableNum}
            onChange={setInput}
          ></input>
          <button>Order</button>
        </div>
      </form>
    </div>
  );
});
export default UIForm;
