import styles from './OrderDetail2.module.scss';
import LineItem from '../LineItem/LineItem';
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

// Used to display the details of any order, including the cart (unpaid order)
export default function OrderDetail2({ 
    order, handleChangeQty, handleCheckout,
    setQuantity,
    showOrderCart,
   setShowOrderCart
}) {
    if (!order) return null;

    const lineItems = order.lineItems.map(item =>
      <LineItem
        lineItem={item}
        isPaid={order.isPaid}
        handleChangeQty={handleChangeQty}
        key={item._id}
      />
    );

    useEffect(()=> {
      setQuantity(order.totalQty)
    },[order])
     
    return (
        <div className={styles.container} style={{ overflowY: 'scroll' }}>
     
       <div className={styles.OrderDetail}>
        <div >
          {order.isPaid ?
            <span className={styles.cartTitle}>Styles In Your Bag &nbsp;&nbsp;&nbsp;&nbsp;<span className="smaller">{order.orderId}</span></span>
            :
            <span className={styles.cartTitle}>Styles In Your Bag</span>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;<span>{new Date(order.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className={`${styles.lineItemContainer} flex-ctr-ctr flex-col scroll-y`}>
          {lineItems.length ?
            <>
              {lineItems}
              <section className={styles.total}>
                {order.isPaid ?
                  <span className={styles.right}>TOTAL&nbsp;&nbsp;</span>
                  :
                  <button
                    className="btn-sm"
                    onClick={handleCheckout}
                    disabled={!lineItems.length}
                  >CHECKOUT</button>
                }
                <span>{order.totalQty}</span>
                <span className={styles.right}>${order.orderTotal.toFixed(2)}</span>
              </section>
            </>
            :
            <div className={styles.hungry}>The cart is empty.</div>
          }
        </div>
        <button className={styles.home} onClick={()=>setShowOrderCart(false)}><Link to={'/HOME'}>Home</Link></button>
      </div>
      </div>
    );
  }