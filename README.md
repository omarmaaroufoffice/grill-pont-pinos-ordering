# The Grill at Pont Pinos - Ordering System

A modern, responsive web application for restaurant ordering designed for the special event on August 8th at The Grill at Pont Pinos. Customers can scan a QR code to access the menu, place orders, and receive order numbers, while staff can manage the menu and track orders in real-time.

## 🚀 Features

### Customer Features
- **QR Code Access**: Customers scan a QR code to access the menu
- **Modern Menu Display**: Beautiful, categorized menu with item descriptions and prices
- **Shopping Cart**: Add/remove items with quantity controls
- **Order Placement**: Simple checkout with name and phone number
- **Order Confirmation**: Receive order number and confirmation details
- **Mobile-Responsive**: Optimized for smartphone use

### Admin Features
- **Menu Management**: Add, edit, delete, and toggle availability of menu items
- **Order Management**: View and update order status (pending → preparing → ready → completed)
- **Real-time Notifications**: Instant notifications when new orders arrive
- **Dashboard Stats**: Overview of orders, revenue, and status counts
- **Order Tracking**: Filter orders by status and manage workflow

### Technical Features
- **Real-time Updates**: Socket.io for instant order notifications
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive interface
- **REST API**: Clean backend API for all operations
- **Order Numbers**: Automatic sequential order numbering starting from 1000

## 📁 Project Structure

```
legends/
├── server/
│   └── index.js              # Express server with Socket.io
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomerMenu.js     # Customer menu interface
│   │   │   ├── Cart.js             # Shopping cart modal
│   │   │   ├── OrderConfirmation.js # Order confirmation page
│   │   │   ├── AdminDashboard.js   # Admin main dashboard
│   │   │   ├── MenuManagement.js   # Menu CRUD operations
│   │   │   └── OrderManagement.js  # Order status management
│   │   └── App.js            # Main app with routing
├── qr-generator.js           # QR code generation utility
├── menu-qr-code.png         # Generated QR code (PNG)
├── menu-qr-code.svg         # Generated QR code (SVG)
├── menu-qr-code.html        # Printable QR code page
└── package.json             # Project dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install
```

### 2. Start the Application
```bash
# From the root directory, start both server and client
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend client on `http://localhost:3000`

### 3. Access the Application
- **Customer Menu**: `http://localhost:3000/` (scan QR code or visit directly)
- **Admin Dashboard**: `http://localhost:3000/admin`

## 📱 QR Code Setup

QR codes have been generated in multiple formats:

1. **menu-qr-code.png** - High-quality PNG for digital displays
2. **menu-qr-code.svg** - Scalable vector format
3. **menu-qr-code.html** - Printable webpage with instructions

### Printing QR Codes
1. Open `menu-qr-code.html` in your browser
2. Print the page (Ctrl+P / Cmd+P)
3. Use for table tents, posters, or signage

## 🔧 Configuration

### Default Menu Items
The system comes with sample menu items:
- Grilled Salmon ($28.99)
- BBQ Ribs ($24.99)
- Grilled Vegetable Platter ($18.99)
- Craft Beer ($6.99)

### Order Number System
- Orders start at #1000
- Sequential numbering for easy tracking
- Displayed prominently to customers

### Categories
Default categories include:
- Main Course
- Appetizers
- Beverages
- Desserts
- Sides

## 🎯 Usage Instructions

### For Customers
1. Scan the QR code with your phone camera
2. Browse the menu by category
3. Add items to your cart
4. Click the cart button to review your order
5. Enter your name and phone number
6. Submit your order and receive your order number
7. Wait for your number to be called

### For Staff (Admin Panel)
1. Navigate to `/admin` in your browser
2. **Order Management Tab**:
   - View all orders filtered by status
   - Update order status as you prepare food
   - See customer contact information
3. **Menu Management Tab**:
   - Add new menu items
   - Edit existing items (name, description, price, category)
   - Enable/disable items
   - Delete items

### Order Workflow
1. **Pending** - New order received
2. **Preparing** - Kitchen has started preparation
3. **Ready** - Order is ready for pickup
4. **Completed** - Customer has picked up and paid

## 🎨 Design Features

### Color Scheme
- Primary: Blue-purple gradient (#667eea to #764ba2)
- Success: Green (#27ae60)
- Warning: Orange (#f39c12)
- Error: Red (#e74c3c)
- Background: Dynamic gradient overlay

### Typography
- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Responsive font sizes
- Clear hierarchy with appropriate weights

### Animations
- Smooth hover effects
- Bounce animations for confirmations
- Slide-in notifications
- Transform effects on buttons

## 🔄 API Endpoints

### Customer Endpoints
- `GET /api/menu` - Get available menu items
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderNumber` - Get order by number

### Admin Endpoints
- `GET /api/admin/menu` - Get all menu items
- `POST /api/admin/menu` - Add menu item
- `PUT /api/admin/menu/:id` - Update menu item
- `DELETE /api/admin/menu/:id` - Delete menu item
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

### Real-time Events (Socket.io)
- `newOrder` - Emitted when customer places order
- `orderUpdate` - Emitted when order status changes

## 📊 Features Overview

### Real-time Dashboard
- Live order count statistics
- Revenue tracking
- Status distribution
- Instant notifications

### Mobile-First Design
- Touch-friendly interface
- Responsive layouts
- Fast loading times
- Intuitive navigation

### Order Management
- Clear visual status indicators
- One-click status updates
- Customer contact information
- Time stamps for all orders

## 🚀 Deployment Notes

For production deployment:

1. Update the QR code URL in `qr-generator.js` to your domain
2. Regenerate QR codes with: `node qr-generator.js`
3. Update Socket.io CORS settings in `server/index.js`
4. Set `NODE_ENV=production`
5. Build the client: `cd client && npm run build`

## 🆘 Troubleshooting

### Common Issues

**QR Code not working:**
- Ensure the URL in `qr-generator.js` matches your server
- Check that the server is running on the correct port

**Orders not appearing:**
- Verify Socket.io connection in browser console
- Check server logs for errors
- Ensure both client and server are running

**Styling issues:**
- Clear browser cache
- Check for JavaScript console errors
- Verify all dependencies are installed

## 📞 Support

For the August 8th event at The Grill at Pont Pinos, this system provides:
- Contactless ordering
- Efficient order management
- Professional presentation
- Real-time communication between customers and staff

The system is designed to handle the special event seamlessly while providing a modern, professional experience for your customers.
