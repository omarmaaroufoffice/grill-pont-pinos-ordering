import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import config from '../config';

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const MenuItem = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ItemName = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const ItemDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ItemPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CartToggle = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 30px rgba(231, 76, 60, 0.6);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #f39c12;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart!`);
  };

  const updateCartItem = (itemId, quantity) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const groupItemsByCategory = () => {
    return menuItems.reduce((groups, item) => {
      const category = item.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  const groupedItems = groupItemsByCategory();

  return (
    <Container>
      {Object.entries(groupedItems).map(([category, items]) => (
        <CategorySection key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <MenuGrid>
            {items.map(item => (
              <MenuItem key={item.id}>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                <AddButton onClick={() => addToCart(item)}>
                  Add to Cart
                </AddButton>
              </MenuItem>
            ))}
          </MenuGrid>
        </CategorySection>
      ))}

      {cart.length > 0 && (
        <CartToggle onClick={() => setShowCart(true)}>
          🛒
          <CartBadge>{getTotalItems()}</CartBadge>
        </CartToggle>
      )}

      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        updateCartItem={updateCartItem}
        onOrderComplete={(orderNumber) => {
          setCart([]);
          setShowCart(false);
          navigate(`/order-confirmation/${orderNumber}`);
        }}
      />
    </Container>
  );
};

export default CustomerMenu;
