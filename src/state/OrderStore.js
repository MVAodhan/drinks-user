import { store } from "@risingstack/react-easy-state";

const OrderStore = store({
  items: [],
  TableNum: "",
});

export default OrderStore;
