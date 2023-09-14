import React, { useContext, useEffect, useState } from 'react';
import scrollToTop from '../../lib/utils/scrollToTop';
import BannerPageName from '../../components/bannerPageName';
import { getTokenFromStorage } from '../../lib/utils/getLocalStorageToken';
import { deleteCart, getActiveCart } from '../../services/cart.service';
import { Product } from '../../lib/interfaces';

import AdditionalButton from '../../components/buttons/additionalButton';
import { CartListItem } from './CartListItem';
import { EmptyCart } from './EmptyCart';
import { CartContext } from '../../App';
import { Spinner } from '@material-tailwind/react';

function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTokenFromStorage().then(res => {
      setToken(res);
    });
  }, []);

  async function updateCart() {
    setLoading(true);
    getActiveCart(token)
      .then(response => {
        setCart(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  const handleCleanCart = () => {
    deleteCart(token, cart.id, cart.version).then(() => setCart(null));
  };

  useEffect(() => {
    scrollToTop();
    if (token) {
      updateCart();
    }
  }, [token]);

  return (
    <>
      <div className='bg-secondaryColor dark:bg-grayMColor flex-1'>
        <BannerPageName>MY CART</BannerPageName>
        <div className='py-sm px-sm max-w-[1440px] mx-auto lg:px-big'>
          {cart?.lineItems && cart?.lineItems.length > 0 && (
            <div className='flex flex-col'>
              <div className='flex flex-col border-b-2 border-accentColor dark:border-basicColor'>
                <div className='border-b-2 border-accentColor dark:border-basicColor p-2 flex justify-between items-center mb-4'>
                  <h3 className='text-h3 text-accentColor dark:text-basicColor font-bold  md:text-start'>
                    My list of products
                  </h3>
                  <AdditionalButton onClick={handleCleanCart}>Clean</AdditionalButton>
                </div>
                {cart?.lineItems.map((el: Product) => (
                  <CartListItem
                    token={token}
                    cartId={cart.id}
                    key={el.id}
                    el={el}
                    version={cart.version}
                    onUpdate={updateCart}
                  />
                ))}
              </div>
              <div className='flex flex-col md:flex-row items-center justify-center md:justify-end p-4 border-b-2 border-accentColor dark:border-basicColor'>
                <p className='text-center md:text-start mb-2 md:mr-4 md:mb-0'>
                  Do you have a promocode? Enter it here:
                </p>
                <input
                  className='p-2 font-medium rounded-md border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black md:mr-2 mb-2 md:mb-0'
                  type='text'
                  placeholder='Enter promocode'
                />
                <AdditionalButton>Apply</AdditionalButton>
              </div>
              <div className='flex justify-end items-center p-2'>
                <p className='text-h3 text-accentColor dark:text-basicColor font-bold mr-4'>Total cost:</p>
                <p className='text-h3 font-bold'>132400</p>
              </div>
            </div>
          )}
          {cart?.lineItems.length == 0 && (
            <div>
              <EmptyCart />
            </div>
          )}
          {loading && (
            <div className='flex items-center justify-center'>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
