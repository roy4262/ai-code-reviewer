// Sample code snippets for testing the application
export const TEST_CODE_SAMPLES = {
  javascript: {
    name: 'JavaScript Function',
    code: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

// Usage example
const cartItems = [
  { price: 10.99, quantity: 2 },
  { price: 5.50, quantity: 1 },
  { price: 15.00, quantity: 3 }
];

console.log(calculateTotal(cartItems));`
  },
  
  python: {
    name: 'Python Class',
    code: `class BankAccount:
    def __init__(self, account_number, initial_balance=0):
        self.account_number = account_number
        self.balance = initial_balance
        self.transactions = []
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self.transactions.append(f"Deposited ${amount}")
            return True
        return False
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            self.transactions.append(f"Withdrew ${amount}")
            return True
        return False
    
    def get_balance(self):
        return self.balance

# Example usage
account = BankAccount("12345", 1000)
account.deposit(500)
account.withdraw(200)
print(f"Current balance: ${account.get_balance()}")`
  },
  
  react: {
    name: 'React Component',
    code: `import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;`
  },
  
  buggyCode: {
    name: 'Code with Issues',
    code: `function processData(data) {
  // Missing null check
  var result = [];
  
  for (var i = 0; i <= data.length; i++) { // Off-by-one error
    if (data[i].status = 'active') { // Assignment instead of comparison
      result.push({
        id: data[i].id,
        name: data[i].name,
        // Missing comma
        email: data[i].email
        phone: data[i].phone
      });
    }
  }
  
  // Memory leak - event listener not removed
  document.addEventListener('click', function() {
    console.log('Clicked');
  });
  
  return result;
}

// Synchronous operation that should be async
function fetchUserData(userId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/users/' + userId, false); // Synchronous request
  xhr.send();
  return JSON.parse(xhr.responseText);
}`
  }
};

// Test scenarios for different features
export const TEST_SCENARIOS = [
  {
    name: 'Basic Function Review',
    description: 'Test basic code analysis functionality',
    code: TEST_CODE_SAMPLES.javascript.code,
    language: 'javascript',
    expectedFeatures: ['syntax analysis', 'performance suggestions', 'best practices']
  },
  {
    name: 'Bug Detection',
    description: 'Test ability to detect common bugs and issues',
    code: TEST_CODE_SAMPLES.buggyCode.code,
    language: 'javascript',
    expectedFeatures: ['bug detection', 'syntax errors', 'logic errors']
  },
  {
    name: 'React Component Analysis',
    description: 'Test React-specific analysis',
    code: TEST_CODE_SAMPLES.react.code,
    language: 'javascript',
    expectedFeatures: ['React patterns', 'hooks usage', 'component structure']
  },
  {
    name: 'Python Class Review',
    description: 'Test Python-specific analysis',
    code: TEST_CODE_SAMPLES.python.code,
    language: 'python',
    expectedFeatures: ['class design', 'method implementation', 'Python conventions']
  }
];

// Utility function to get random test code
export const getRandomTestCode = () => {
  const samples = Object.values(TEST_CODE_SAMPLES);
  const randomIndex = Math.floor(Math.random() * samples.length);
  return samples[randomIndex];
};

// Utility function to get test code by language
export const getTestCodeByLanguage = (language) => {
  return TEST_CODE_SAMPLES[language] || TEST_CODE_SAMPLES.javascript;
};