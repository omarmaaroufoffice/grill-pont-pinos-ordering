import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast from 'react-hot-toast';
import config from '../config';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MenuList = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const MenuForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ecf0f1;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  ${props => !props.available && `
    opacity: 0.6;
    background: #f8f9fa;
  `}
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
`;

const ItemPrice = styled.span`
  color: #27ae60;
  font-weight: 600;
`;

const ItemCategory = styled.span`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const ItemStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => props.available ? `
    background: #d4edda;
    color: #155724;
  ` : `
    background: #f8d7da;
    color: #721c24;
  `}
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'edit' && `
    background: linear-gradient(45deg, #3498db, #2980b9);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    }
  `}
  
  ${props => props.variant === 'toggle' && `
    background: linear-gradient(45deg, #f39c12, #e67e22);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(243, 156, 18, 0.4);
    }
  `}
  
  ${props => props.variant === 'delete' && `
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
    }
  `}
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
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

const CancelButton = styled.button`
  width: 100%;
  background: #95a5a6;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  &:hover {
    background: #7f8c8d;
    transform: translateY(-2px);
  }
`;

const MenuManagement = ({ menuItems, refreshMenuItems }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Main Course', 'Appetizers', 'Beverages', 'Desserts', 'Sides'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Main Course'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.price.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setIsSubmitting(true);
    try {
      const itemData = {
        ...formData,
        price: price
      };

      if (editingItem) {
        await axios.put(`${config.API_BASE_URL}/api/admin/menu/${editingItem.id}`, {
          ...itemData,
          available: editingItem.available
        });
        toast.success('Menu item updated successfully');
      } else {
        await axios.post(`${config.API_BASE_URL}/api/admin/menu`, itemData);
        toast.success('Menu item added successfully');
      }

      handleCancelEdit();
      refreshMenuItems();
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      await axios.put(`${config.API_BASE_URL}/api/admin/menu/${item.id}`, {
        ...item,
        available: !item.available
      });
      toast.success(`${item.name} ${!item.available ? 'enabled' : 'disabled'}`);
      refreshMenuItems();
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Failed to update item availability');
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      await axios.delete(`${config.API_BASE_URL}/api/admin/menu/${item.id}`);
      toast.success('Menu item deleted successfully');
      refreshMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  return (
    <Container>
      <MenuList>
        <SectionTitle>Current Menu Items</SectionTitle>
        {menuItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '2rem' }}>
            No menu items yet. Add your first item using the form.
          </p>
        ) : (
          menuItems.map(item => (
            <MenuItem key={item.id} available={item.available}>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemDetails>
                  <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  <ItemCategory>{item.category}</ItemCategory>
                  <ItemStatus available={item.available}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </ItemStatus>
                </ItemDetails>
              </ItemInfo>
              <ItemActions>
                <ActionButton 
                  variant="edit" 
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </ActionButton>
                <ActionButton 
                  variant="toggle" 
                  onClick={() => handleToggleAvailability(item)}
                >
                  {item.available ? 'Disable' : 'Enable'}
                </ActionButton>
                <ActionButton 
                  variant="delete" 
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </ActionButton>
              </ItemActions>
            </MenuItem>
          ))
        )}
      </MenuList>

      <MenuForm>
        <SectionTitle>
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </SectionTitle>
        
        {editingItem && (
          <CancelButton onClick={handleCancelEdit}>
            Cancel Edit
          </CancelButton>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter item name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter item description"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
          </SubmitButton>
        </form>
      </MenuForm>
    </Container>
  );
};

export default MenuManagement;
