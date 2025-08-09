import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import config from '../config';

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const TabNavigation = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  background: ${props => props.active ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.active ? 'white' : '#2c3e50'};
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NewOrderNotification = styled.div`
  position: fixed;
  top: 100px;
  right: 2rem;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
  z-index: 1000;
  animation: slideIn 0.5s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newOrderNotification, setNewOrderNotification] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(config.SOCKET_URL);
    setSocket(newSocket);

    // Listen for new orders
    newSocket.on('newOrder', (order) => {
      setOrders(prevOrders => [order, ...prevOrders]);
      setNewOrderNotification(order);
      toast.success(`New Order #${order.orderNumber}!`, {
        icon: '🔔',
        duration: 6000,
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => setNewOrderNotification(null), 5000);
    });

    // Listen for order updates
    newSocket.on('orderUpdate', (updatedOrder) => {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    });

    fetchInitialData();

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    calculateStats();
  }, [orders]);

  const fetchInitialData = async () => {
    try {
      const [ordersResponse, menuResponse] = await Promise.all([
        axios.get(`${config.API_BASE_URL}/api/admin/orders`),
        axios.get(`${config.API_BASE_URL}/api/admin/menu`)
      ]);
      
      setOrders(ordersResponse.data);
      setMenuItems(menuResponse.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const calculateStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const totalRevenue = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.total, 0);

    setStats({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue
    });
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${config.API_BASE_URL}/api/admin/orders/${orderId}`, {
        status: newStatus
      });
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const refreshMenuItems = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/admin/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error refreshing menu items:', error);
      toast.error('Failed to refresh menu items');
    }
  };

  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <StatValue>{stats.totalOrders}</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.pendingOrders}</StatValue>
          <StatLabel>Pending Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.completedOrders}</StatValue>
          <StatLabel>Completed Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>${stats.totalRevenue.toFixed(2)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
      </StatsGrid>

      <TabNavigation>
        <Tab 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          Order Management
        </Tab>
        <Tab 
          active={activeTab === 'menu'} 
          onClick={() => setActiveTab('menu')}
        >
          Menu Management
        </Tab>
      </TabNavigation>

      {activeTab === 'orders' && (
        <OrderManagement 
          orders={orders} 
          updateOrderStatus={updateOrderStatus}
        />
      )}

      {activeTab === 'menu' && (
        <MenuManagement 
          menuItems={menuItems} 
          refreshMenuItems={refreshMenuItems}
        />
      )}

      {newOrderNotification && (
        <NewOrderNotification>
          <strong>New Order!</strong><br />
          Order #{newOrderNotification.orderNumber} - ${newOrderNotification.total.toFixed(2)}
        </NewOrderNotification>
      )}
    </Container>
  );
};

export default AdminDashboard;
