import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      const numericPrice = typeof item.cost === 'string'
        ? parseFloat(item.cost.replace('$', ''))
        : Number(item.cost);
      return sum + numericPrice * item.quantity;
    }, 0);
    return total.toFixed(2);
  };

  // Calculate total number of items in cart
  const calculateTotalQuantity = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Calculate total cost based on quantity for an individual item
  const calculateTotalCost = (item) => {
    const numericPrice = typeof item.cost === 'string'
      ? parseFloat(item.cost.replace('$', ''))
      : Number(item.cost);
    return (numericPrice * item.quantity).toFixed(2);
  };

  // Handle continue shopping click
  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Handle checkout button click
  const handleCheckout = (e) => {
    if (e) e.preventDefault();
    setShowCheckoutModal(true);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove if reaching 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-page-container">
      <div className="cart-inner">
        {/* Header Panel with Total summary */}
        <div className="cart-header-panel">
          <div>
            <h2 className="cart-page-title">Your Botanical Cart</h2>
            <p className="text-stone-500 text-sm mt-1">
              Review your selected greenery and proceed to checkout
            </p>
          </div>
          <div className="cart-summary-badges">
            <div className="summary-badge-item">
              <div className="badge-label">Total Plants</div>
              <div className="badge-value">{calculateTotalQuantity()}</div>
            </div>
            <div className="summary-badge-item">
              <div className="badge-label">Grand Total</div>
              <div className="badge-value">${calculateTotalAmount()}</div>
            </div>
          </div>
        </div>

        {/* Empty Cart Message */}
        {cart.length === 0 ? (
          <div className="empty-cart-view">
            <div className="empty-cart-icon">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="empty-cart-title">Your cart is currently empty</h3>
            <p className="empty-cart-desc">
              Bring tranquility and freshness to your home. Explore our lush collection of houseplants!
            </p>
            <button
              onClick={handleContinueShopping}
              className="continue-shopping-btn mx-auto"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Discover Plants
            </button>
          </div>
        ) : (
          <>
            {/* Itemized Cart List */}
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.name} className="cart-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumbnail"
                  />

                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-unit-price">
                      Unit Price: <span className="font-semibold text-stone-700">{item.cost}</span>
                    </p>
                    <div className="cart-item-subtotal">
                      Subtotal: <span className="font-bold">${calculateTotalCost(item)}</span>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    {/* Quantity Modifiers */}
                    <div className="quantity-modifier-group">
                      <button
                        className="qty-btn"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="qty-count">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      className="delete-item-btn"
                      onClick={() => handleRemove(item)}
                      title={`Remove ${item.name} from cart`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer Actions */}
            <div className="cart-footer-actions">
              <button
                className="continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </button>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Checkout (${calculateTotalAmount()})
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkout "Coming Soon" Modal */}
      {showCheckoutModal && (
        <div className="checkout-modal-backdrop" onClick={() => setShowCheckoutModal(false)}>
          <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold font-serif text-stone-900 mb-2">Checkout Coming Soon!</h3>
            <p className="text-stone-600 mb-6">
              Thank you for choosing Paradise Nursery! Our secure online payment gateway is currently being finalized. 
              Your simulated order of <strong className="text-emerald-700">{calculateTotalQuantity()} plants</strong> totaling <strong className="text-emerald-700">${calculateTotalAmount()}</strong> is saved.
            </p>
            <button
              className="checkout-btn w-full justify-center"
              onClick={() => setShowCheckoutModal(false)}
            >
              Back to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;