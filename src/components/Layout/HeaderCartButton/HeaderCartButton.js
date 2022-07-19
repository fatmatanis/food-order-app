import { useContext, useEffect, useState } from "react";

import CartContext from "../../../store/cart-context";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  //reduce içindeki ilk parametre bir function, ikinci parametre ise 0'dan başladığını anlatıyor (staring value).
  // curNumber = Current number. Toplam miktarı verecek.

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  //Carta (sepete) yemek ekleyip sildiğimizde animasyonla bunun belirmesini istediğimiz için ilk önce classnameleri düzenledik.
  //Bunun doğru çalışması içinde useEffect kullanacağız Bunu useState'le kullanmaya ihtiyaç olacak.

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300); //css'de 300 ms içinde animasyon sona ereceği için 300 ms sonra clean up function olsun istedik ki animasyon tekrar tekrar çalışsın.

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
