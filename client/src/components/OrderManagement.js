import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 0.5rem;
`;

const FilterTab = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.25rem;
  
  &:hover {
    color: ${props => props.active ? 'white' : '#2c3e50'};
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
`;

const OrderCard = styled.div`
  border: 2px solid ${props => {
    switch (props.status) {
      case 'pending': return '#f39c12';
      case 'preparing': return '#3498db';
      case 'ready': return '#27ae60';
      case 'completed': return '#95a5a6';
      default: return '#ecf0f1';
    }
  }};
  border-radius: 15px;
  padding: 1.5rem;
  background: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
`;

const OrderNumber = styled.h3`
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0;
`;

const OrderStatus = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case 'preparing':
        return `
          background: #d1ecf1;
          color: #0c5460;
        `;
      case 'ready':
        return `
          background: #d4edda;
          color: #155724;
        `;
      case 'completed':
        return `
          background: #f8f9fa;
          color: #6c757d;
        `;
      default:
        return `
          background: #f8f9fa;
          color: #6c757d;
        `;
    }
  }}
`;

const CustomerInfo = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

const CustomerName = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
`;

const CustomerPhone = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const OrderTime = styled.div`
  color: #7f8c8d;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f2f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  color: #2c3e50;
  font-weight: 500;
`;

const ItemQuantity = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const ItemPrice = styled.span`
  color: #27ae60;
  font-weight: 600;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  padding-top: 1rem;
  border-top: 2px solid #ecf0f1;
  margin-bottom: 1.5rem;
`;

const StatusActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StatusButton = styled.button`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 100px;
  
  ${props => {
    switch (props.variant) {
      case 'preparing':
        return `
          background: linear-gradient(45deg, #3498db, #2980b9);
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
          }
        `;
      case 'ready':
        return `
          background: linear-gradient(45deg, #27ae60, #2ecc71);
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
          }
        `;
      case 'completed':
        return `
          background: linear-gradient(45deg, #95a5a6, #7f8c8d);
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(149, 165, 166, 0.4);
          }
        `;
      default:
        return `
          background: #ecf0f1;
          color: #2c3e50;
          
          &:hover {
            background: #d5dbdb;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const OrderManagement = ({ orders, updateOrderStatus }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { key: 'all', label: 'All Orders' },
    { key: 'pending', label: 'Pending' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'ready', label: 'Ready' },
    { key: 'completed', label: 'Completed' }
  ];

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const getStatusActions = (order) => {
    const actions = [];
    
    switch (order.status) {
      case 'pending':
        actions.push({
          label: 'Start Preparing',
          variant: 'preparing',
          newStatus: 'preparing'
        });
        break;
      case 'preparing':
        actions.push({
          label: 'Mark Ready',
          variant: 'ready',
          newStatus: 'ready'
        });
        break;
      case 'ready':
        actions.push({
          label: 'Complete Order',
          variant: 'completed',
          newStatus: 'completed'
        });
        break;
      default:
        break;
    }
    
    return actions;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container>
      <SectionTitle>Order Management</SectionTitle>
      
      <FilterTabs>
        {statusOptions.map(option => (
          <FilterTab
            key={option.key}
            active={statusFilter === option.key}
            onClick={() => setStatusFilter(option.key)}
          >
            {option.label}
            {option.key !== 'all' && (
              <span style={{ marginLeft: '0.5rem' }}>
                ({orders.filter(order => order.status === option.key).length})
              </span>
            )}
          </FilterTab>
        ))}
      </FilterTabs>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          {statusFilter === 'all' 
            ? 'No orders yet. Orders will appear here when customers place them.'
            : `No ${statusFilter} orders at the moment.`
          }
        </EmptyState>
      ) : (
        <OrdersGrid>
          {filteredOrders.map(order => (
            <OrderCard key={order.id} status={order.status}>
              <OrderHeader>
                <OrderNumber>Order #{order.orderNumber}</OrderNumber>
                <OrderStatus status={order.status}>
                  {order.status}
                </OrderStatus>
              </OrderHeader>

              <CustomerInfo>
                <CustomerName>{order.customerName}</CustomerName>
                <CustomerPhone>{order.customerPhone}</CustomerPhone>
                <OrderTime>Ordered at {formatTime(order.timestamp)}</OrderTime>
              </CustomerInfo>

              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={index}>
                    <div>
                      <ItemName>{item.name}</ItemName>
                      <ItemQuantity>× {item.quantity}</ItemQuantity>
                    </div>
                    <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderTotal>
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </OrderTotal>

              <StatusActions>
                {getStatusActions(order).map((action, index) => (
                  <StatusButton
                    key={index}
                    variant={action.variant}
                    onClick={() => updateOrderStatus(order.id, action.newStatus)}
                  >
                    {action.label}
                  </StatusButton>
                ))}
              </StatusActions>
            </OrderCard>
          ))}
        </OrdersGrid>
      )}
    </Container>
  );
};

export default OrderManagement;
