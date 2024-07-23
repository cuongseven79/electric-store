'use client';
import api from '@/lib/api';
import { ICartItem, IProduct } from '@/lib/definitions';
import currency from 'currency.js';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHits } from 'react-instantsearch';

const CartContext = createContext({});

export function CartProvider({
  children,
}: {
  children: ReactNode | ReactNode[] | any;
}) {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { hits, sendEvent } = useHits({});

  const total = useMemo(
    () =>
      cart.reduce((prev: number, item: ICartItem) => {
        return prev + (item.product?.price || 0) * item.quantity;
      }, 0),
    [JSON.stringify(cart)],
  );

  function addCart(productId: number, quantity?: number) {
    const item = cart.find((item) => item.productId == productId);
    if (item) {
      const tmp = cart.map((item) => {
        if (item.productId == productId) item.quantity += quantity || 1;
        return item;
      });
      setCart(tmp);
    } else {
      console.log('add here');
      setCart([...cart, { productId: productId, quantity: quantity || 1 }]);
    }

    const hit = hits.find((hit) => hit.id === productId);
    if (!hit) {
      console.log('hit not found', hits);
      return;
    }
    sendEvent('conversion', hit, 'Add to cart', {
      // Special subtype
      eventSubtype: 'addToCart',
      // An array of objects representing each item added to the cart
      objectIDs: [hit.objectID],
      objectData: [
        {
          ...hit,
          // The discount value for this item, if applicable
          discount: hit.discount || 0,
          // The price value for this item (minus the discount)
          price: hit.price,
          // How many of this item were added
          quantity: quantity || 1,
        },
      ],
      currency: 'VND',
      value: hit.price * (quantity || 1),
    });
  }

  function removeCart(productId: number) {
    const items = cart.filter((item) => item.productId !== productId);
    setCart([...items]);
  }

  function clearCart() {
    localStorage.setItem('cart', '[]');
    setCart([]);
  }

  function setQuantity(productId: number, quantity: number) {
    const item = cart.find((item) => item.productId == productId);
    if (item) {
      const tmp = cart.map((item) => {
        if (item.productId == productId) item.quantity = quantity;
        return item;
      });
      setCart(tmp);
    } else {
      setCart([...cart, { productId: productId, quantity: quantity }]);
    }
  }

  function increaseQuantity(productId: number) {
    const item = cart.find((item) => item.productId == productId);
    if (!item) return;

    if (item.quantity >= item.product!.quantity) return;
    const tmp = cart.map((item) => {
      if (item.productId == productId) item.quantity += 1;
      return item;
    });
    setCart(tmp);
  }

  function decreaseQuantity(productId: number) {
    const item = cart.find((item) => item.productId == productId);
    if (!item) return;

    if (item.quantity <= 1) return;
    const tmp = cart.map((item) => {
      if (item.productId == productId) item.quantity -= 1;
      return item;
    });
    setCart(tmp);
  }

  useEffect(() => {
    if (isLoading) return;
    (async () => {
      setIsLoading(true);

      const cartItems: ICartItem[] = await Promise.all(
        cart.map(async (item: ICartItem) => {
          try {
            const resp = await api(`/api/products/${item.productId}`);
            item.product = resp as IProduct;
            return item;
          } catch (e) {
            removeCart(item.productId);
          }
        }),
      );
      setCart(cartItems);
      setIsLoading(false);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    })();
  }, [JSON.stringify(cart)]);

  // Restore
  useEffect(() => {
    const _cart = localStorage.getItem('cart');
    if (_cart) {
      setCart(JSON.parse(_cart));
    }
    setIsLoading(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        setQuantity,
        total,
        isLoading,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
