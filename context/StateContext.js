import React, {createContext,useContext,useState,useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children})  =>{
const [showCart, setShowCart] = useState(false);
const [cartItems, setcartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
const [totalQuantities, setTotalQuantities] = useState(0);
const [qty, setQty] = useState(1);
let foundProduct ;
let index;
const onAdd =   (product,quantity)  =>{

    const   checkProductInCart  =   cartItems.find((item)   =>item._id  === product.id);
    setTotalPrice((prevTotalPrice)  =>  prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities)    =>  prevTotalQuantities + quantity);
    if(checkProductInCart){
    

    

const   updatedCartItems    =   cartItems.map((cartProduct) =>{
    if ( cartProduct._id === product._id) return{
        ...cartProduct,
        quantity:   cartProduct.quantity    +   quantity
    }
})
setcartItems(updatedCartItems);

}else{
    product.quantity=quantity;
    setcartItems([...cartItems, {...product}]);

}
toast.success(`${qty}   ${product.name} added to the cart` );
}
const incQty = () =>{
    setQty((prevQty) =>     prevQty + 1);
}

const decQty = () => {
    
    setQty((prevQty)    =>{
        if(prevQty - 1 < 1) return 1;
        return prevQty - 1;
    })
  
};

const onRemove =(product) =>{
    foundProduct = cartItems.find((item)=>item._id ===product._id)
    const newCartItems = cartItems.filter((item)=> item._id !== product._id);
    setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities - foundProduct.quantity);
    setcartItems(newCartItems);

} 
const toggleCartItemQuantity= (id,value) =>{
    foundProduct = cartItems.find((item)=>item._id ===id)
    index = cartItems.find((product)=>product._id ===id);
    const newCartItems = cartItems.filter((item)=> item._id !==id);

if(value === 'inc'){
   
setcartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}]);
setTotalPrice((prevTotalPrice)=>prevTotalPrice +foundProduct.price);
setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + 1);
}else if (value === 'dec') {
if(foundProduct.quantity - 1){
    setcartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity - 1}]);
setTotalPrice((prevTotalPrice)=>prevTotalPrice  - foundProduct.price);
setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities - 1);
}

}
}
return (
    <Context.Provider value = {{
        showCart,
        cartItems,
        totalQuantities,
        totalPrice,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setcartItems,
        setTotalPrice,
        setTotalQuantities






    }}>
        {children}
    </Context.Provider>
)

}

export const useStateContext = () =>    useContext(Context);