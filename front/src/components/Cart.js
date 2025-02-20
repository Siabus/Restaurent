import React, { useContext } from 'react';
import { RestaurantContext } from '../contexts/RestaurantContext';

const Cart = () => {
    const { cartItems, totalPrice, handleRemoveItems } = useContext(RestaurantContext);

    const vatAmount = totalPrice * 0.05;
    const finalPrice = totalPrice + vatAmount;

    const generateReceipt = () => {
        // Creating a simple receipt
        const receipt = `
            Receipt
            ------------------------
            ${cartItems.map(item => `${item.name} (x${item.quantity}) - $${item.price}`).join('\n')}
            ------------------------
            Subtotal: $${totalPrice.toFixed(2)}
            VAT (5%): $${vatAmount.toFixed(2)}
            ------------------------
            Total Price: $${finalPrice.toFixed(2)}
        `;

        // Creating a Blob to enable downloading
        const blob = new Blob([receipt], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'receipt.txt';  // File name for the receipt
        link.click();
    };

    return (
        <div className="cart-container">
            <h2>Payment</h2>
            {cartItems.length > 0 ? (
                <div>
                    <div className="cart-content">
                        {cartItems.map((dish) => (
                            <div key={dish._id} style={{ marginBottom: '10px' }}>
                                <span>{dish.name} (x{dish.quantity}) - ${dish.price}</span>
                                <button onClick={() => handleRemoveItems(dish)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <strong>Subtotal: </strong> ${totalPrice.toFixed(2)}
                    </div>
                    <div>
                        <strong>VAT (5%): </strong> ${vatAmount.toFixed(2)}
                    </div>
                    <div>
                        <strong>Total Price: </strong> ${finalPrice.toFixed(2)}
                    </div>
                    <button onClick={generateReceipt} style={{ marginTop: '20px' }}>
                        Download Receipt
                    </button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;


