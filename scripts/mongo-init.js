// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the paytm_db database
db = db.getSiblingDB('paytm_db');

// Create a user for the application
db.createUser({
  user: 'paytm_user',
  pwd: 'paytm_password',
  roles: [
    {
      role: 'readWrite',
      db: 'paytm_db'
    }
  ]
});

// Create initial collections with some sample data
db.users.insertMany([
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91-9876543210',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+91-9876543211',
    address: {
      street: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+91-9876543212',
    address: {
      street: '789 Business District',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India'
    },
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('MongoDB initialization completed successfully!');
print('Sample users created:');
db.users.find().forEach(printjson);
