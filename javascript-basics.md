# JavaScript for C/Java Developers

A concise guide to modern JavaScript concepts for developers coming from C or Java backgrounds.

---

## Table of Contents

1. [Arrow Functions](#1-arrow-functions)
2. [Promises](#2-promises)
3. [Async/Await](#3-asyncawait)
4. [Try-Catch](#4-try-catch)

---

## 1. Arrow Functions

### Basic Syntax

Arrow functions are a shorter syntax introduced in ES6, similar to lambda expressions in Java 8+.

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With block body
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
```

### Parameter Rules

```javascript
// No parameters
const sayHello = () => console.log("Hello");

// One parameter (parentheses optional)
const square = x => x * x;

// Multiple parameters (parentheses required)
const add = (a, b) => a + b;

// Returning objects (wrap in parentheses)
const makePerson = (name, age) => ({ name, age });
```

### Key Difference: `this` Keyword

Arrow functions inherit `this` from the parent scope:

```javascript
// Traditional function - 'this' doesn't work as expected
function Counter() {
    this.count = 0;
    setInterval(function() {
        this.count++;  // ERROR: 'this' is undefined
    }, 1000);
}

// Arrow function - 'this' works correctly
function Counter() {
    this.count = 0;
    setInterval(() => {
        this.count++;  // WORKS: 'this' refers to Counter
    }, 1000);
}
```

### Common Use Cases

```javascript
const numbers = [1, 2, 3, 4, 5];

// Array methods
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);

// Event handlers
button.addEventListener('click', () => {
    console.log('Button clicked!');
});
```

---

## 2. Promises

### What is a Promise?

A Promise represents a value that will be available in the future. It's like a "promise" to complete an operation.

**Promise States:**
- **Pending** - Initial state, operation is ongoing
- **Fulfilled** - Operation completed successfully
- **Rejected** - Operation failed

### Creating a Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Data loaded successfully!");
        } else {
            reject("Error loading data!");
        }
    }, 2000);
});
```

### Using Promises with `.then()`

```javascript
// Basic promise chain
fetch('/api/tasks')
    .then(response => response.json())
    .then(data => {
        console.log('Tasks:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Chaining Multiple Operations

```javascript
// Sequential operations
fetchUser(userId)
    .then(user => {
        console.log('User:', user);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
        return fetchComments(posts[0].id);
    })
    .then(comments => {
        console.log('Comments:', comments);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Promise.all() - Parallel Operations

```javascript
// Run multiple promises in parallel
Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/tasks').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
])
.then(([users, tasks, posts]) => {
    console.log('All data loaded:', { users, tasks, posts });
})
.catch(error => {
    console.error('One or more requests failed:', error);
});
```

### Real-World Example

```javascript
// Create a new task
function createTask(title) {
    return fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Task created:', data);
        return data;
    })
    .catch(error => {
        console.error('Failed to create task:', error);
    });
}

// Usage
createTask('Learn JavaScript')
    .then(result => console.log('Success:', result));
```

---

## 3. Async/Await

### What is Async/Await?

Async/await makes asynchronous code look synchronous. It's built on top of Promises but is easier to read.

```javascript
// With Promises (.then)
function fetchData() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// With Async/Await (cleaner!)
async function fetchData() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

### Key Rules

1. **`async` keyword** - Makes a function return a Promise
2. **`await` keyword** - Pauses execution until Promise resolves
3. **`await` only works inside `async` functions**

```javascript
// async function always returns a Promise
async function greet() {
    return "Hello";  // Returns Promise { "Hello" }
}

greet().then(message => console.log(message));  // "Hello"
```

### Sequential vs Parallel Operations

```javascript
// Sequential - one after another (slower)
async function fetchSequential() {
    const users = await fetch('/api/users').then(r => r.json());
    const tasks = await fetch('/api/tasks').then(r => r.json());
    return { users, tasks };
}

// Parallel - at the same time (faster)
async function fetchParallel() {
    const [users, tasks] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/tasks').then(r => r.json())
    ]);
    return { users, tasks };
}
```

### Real Example with Error Handling

```javascript
async function deleteTask(id) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Task deleted:', data);
        return data;
    } catch (error) {
        console.error('Failed to delete task:', error);
        throw error;
    }
}
```

---

## 4. Try-Catch

### Basic Syntax

JavaScript try-catch is almost identical to Java:

```javascript
// Java
try {
    int result = divide(10, 0);
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup");
}

// JavaScript
try {
    const result = divide(10, 0);
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("Cleanup");
}
```

### Try-Catch with Async/Await

```javascript
async function fetchTasks() {
    try {
        // Try to fetch data
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        if (!data.success) {
            throw new Error('Failed to fetch tasks');
        }
        
        return data.tasks;
    } catch (error) {
        // Handle any errors
        console.error('Error:', error.message);
        return [];
    } finally {
        // Always runs (cleanup)
        console.log('Fetch attempt completed');
    }
}
```

### When to Use

✅ **Use try-catch for:**
- Network requests
- Database operations
- JSON parsing
- Async/await operations

```javascript
// Good example
async function loadUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        return await response.json();
    } catch (error) {
        console.error('Error loading user:', error);
        return null;
    }
}
```

---

## Complete Example: Putting It All Together

```javascript
// Arrow function + async/await + try-catch + promises
const fetchAndDisplayTasks = async () => {
    try {
        // Fetch data
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        // Process with arrow functions
        const activeTasks = data.tasks
            .filter(task => !task.completed)
            .map(task => ({
                id: task._id,
                title: task.title,
                date: new Date(task.createdAt).toLocaleDateString()
            }));
        
        console.log('Active tasks:', activeTasks);
        return activeTasks;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

// Usage
fetchAndDisplayTasks()
    .then(tasks => console.log('Loaded tasks:', tasks));
```

---

## Quick Reference

### Arrow Functions
```javascript
const add = (a, b) => a + b;
const square = x => x * x;
const greet = () => console.log("Hello");
```

### Promises
```javascript
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Async/Await
```javascript
async function getData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Try-Catch
```javascript
try {
    const data = JSON.parse(jsonString);
} catch (error) {
    console.error('Parse error:', error);
} finally {
    console.log('Done');
}
```

---

## Key Takeaways

1. **Arrow Functions** - Shorter syntax, inherits `this` from parent scope
2. **Promises** - Represent future values, use `.then()` for chaining
3. **Async/Await** - Makes async code look synchronous, built on Promises
4. **Try-Catch** - Handle errors gracefully, essential with async/await

**Best Practice:** Use async/await instead of `.then()` chains for better readability.

Happy coding! 🚀
