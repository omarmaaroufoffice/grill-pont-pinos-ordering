import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import config from '../config';

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ConfirmationCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 1s ease-in-out;
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -10px, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -5px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }
`;

const Title = styled.h1`
  color: #27ae60;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const OrderNumber = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin: 2rem 0;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
`;

const OrderNumberLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const OrderNumberValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

const OrderDetails = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
    font-weight: 600;
    margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 2px solid #dee2e6;
  }
`;

const Instructions = styled.div`
  background: rgba(52, 152, 219, 0.1);
  border-left: 4px solid #3498db;
  padding: 1.5rem;
  border-radius: 0 10px 10px 0;
  margin: 2rem 0;
  text-align: left;
`;

const InstructionsTitle = styled.h3`
  color: #2980b9;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const InstructionsList = styled.ul`
  color: #34495e;
  line-height: 1.6;
  padding-left: 1.2rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
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

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
`;

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/orders/${orderNumber}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Order not found. Please check your order number.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <ConfirmationCard>
          <LoadingSpinner />
        </ConfirmationCard>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ConfirmationCard>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton to="/">Back to Menu</BackButton>
        </ConfirmationCard>
      </Container>
    );
  }

  return (
    <Container>
      <ConfirmationCard>
        <SuccessIcon>✅</SuccessIcon>
        <Title>Order Confirmed!</Title>
        <Subtitle>
          Thank you for your order! Your food is being prepared.
        </Subtitle>

        <OrderNumber>
          <OrderNumberLabel>Your Order Number</OrderNumberLabel>
          <OrderNumberValue>#{order.orderNumber}</OrderNumberValue>
        </OrderNumber>

        <OrderDetails>
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Order Details</h3>
          {order.items.map((item, index) => (
            <OrderItem key={index}>
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </OrderItem>
          ))}
          <OrderItem>
            <span><strong>Total</strong></span>
            <span><strong>${order.total.toFixed(2)}</strong></span>
          </OrderItem>
        </OrderDetails>

        <Instructions>
          <InstructionsTitle>What's Next?</InstructionsTitle>
          <InstructionsList>
            <li>Keep your order number <strong>#{order.orderNumber}</strong> handy</li>
            <li>Wait for your number to be called</li>
            <li>Show your order number when collecting your food</li>
            <li>Payment will be processed at pickup</li>
          </InstructionsList>
        </Instructions>

        <BackButton to="/">Order More Items</BackButton>
      </ConfirmationCard>
    </Container>
  );
};

export default OrderConfirmation;
