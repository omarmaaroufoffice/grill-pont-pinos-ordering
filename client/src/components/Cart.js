import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../config';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
`;

const CartContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ecf0f1;
`;

const CartTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ecf0f1;
    color: #2c3e50;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const ItemPrice = styled.div`
  color: #27ae60;
  font-weight: 600;
  font-size: 0.95rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  color: #2c3e50;
  min-width: 30px;
  text-align: center;
`;

const CartTotal = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #ecf0f1;
  text-align: center;
`;

const TotalAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const CustomerForm = styled.div`
  margin: 1.5rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &:required {
    border-left: 4px solid #e74c3c;
  }
  
  &:valid {
    border-left: 4px solid #27ae60;
  }
`;

const CheckoutButton = styled.button`
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const Cart = ({ isOpen, onClose, cart, updateCartItem, onOrderComplete }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: cart,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim()
      };

      const response = await axios.post(`${config.API_BASE_URL}/api/orders`, orderData);
      
      toast.success('Order placed successfully!');
      onOrderComplete(response.data.orderNumber);
      
      // Reset form
      setCustomerName('');
      setCustomerPhone('');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <CartOverlay isOpen={isOpen} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <CartContainer>
        <CartHeader>
          <CartTitle>Your Order</CartTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </CartHeader>

        {cart.length === 0 ? (
          <EmptyCart>Your cart is empty</EmptyCart>
        ) : (
          <>
            {cart.map(item => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price.toFixed(2)} each</ItemPrice>
                </ItemInfo>
                <QuantityControls>
                  <QuantityButton 
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton 
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControls>
              </CartItem>
            ))}

            <CartTotal>
              <TotalAmount>Total: ${getTotalPrice().toFixed(2)}</TotalAmount>
            </CartTotal>

            <CustomerForm>
              <FormGroup>
                <Label htmlFor="customerName">Name *</Label>
                <Input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </FormGroup>
            </CustomerForm>

            <CheckoutButton 
              onClick={handleSubmitOrder}
              disabled={isSubmitting || !customerName.trim() || !customerPhone.trim()}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </CheckoutButton>
          </>
        )}
      </CartContainer>
    </CartOverlay>
  );
};

export default Cart;
