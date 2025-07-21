# 🧪 Test Code Samples

Copy and paste any of these code samples into your AI Code Reviewer to test it:

## 1. Simple JavaScript Function
```javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

const cartItems = [
  { price: 10.99, quantity: 2 },
  { price: 5.50, quantity: 1 }
];

console.log(calculateTotal(cartItems));
```

## 2. Python Function with Issues
```python
def find_max(numbers):
    max_num = numbers[0]
    for i in range(len(numbers)):
        if numbers[i] > max_num:
            max_num = numbers[i]
    return max_num

# Test with empty list (will cause error)
result = find_max([])
print(result)
```

## 3. React Component
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
```

## 4. SQL Query
```sql
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2023-01-01'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;
```

## How to Test:
1. Copy any code sample above
2. Paste it into the textarea in your app
3. Click "Review Code" (it should now be enabled!)
4. Wait for the AI analysis

The AI will provide feedback on code quality, potential issues, and improvements!