# 🎓 Personal Task Tracker - Teaching Guide for Instructors

## Session Overview
**Target Audience**: Second Year Computer Science Students  
**Duration**: 2-3 hours  
**Learning Objectives**: 
- Understand full-stack web development
- Learn JWT authentication
- Master CRUD operations
- Work with MongoDB and Express.js

---

## 📝 Pre-Session Checklist

### Students Should Have Installed:
- [ ] Node.js (v14+) - Download from nodejs.org
- [ ] Git - For version control
- [ ] VS Code or any code editor
- [ ] MongoDB Atlas Account (free tier) - mongodb.com/cloud/atlas
- [ ] Postman (optional) - For testing APIs

---

## 🚀 Session Plan - Step by Step

---

## **PART 1: PROJECT SETUP** (20 minutes)

### Step 1: Create GitHub Repository

**🎤 Speaker Notes:**
> "First, we'll create a GitHub repository. This is industry standard practice - always use version control for your projects. It helps track changes, collaborate with teams, and showcase your work to employers."

**Instructions for Students:**
```bash
# Go to github.com and click "New Repository"
# Repository name: todo-list
# Description: Personal Task Tracker with JWT Authentication
# Public/Private: Your choice
# Initialize with README: NO (we'll create our own)
```

**💡 Explain:**
- **Git**: Version control system that tracks code changes
- **GitHub**: Cloud platform to host Git repositories
- **Repository**: A project folder that Git tracks

---

### Step 2: Clone Repository

**🎤 Speaker Notes:**
> "Now let's clone this repository to our local machine. This creates a copy of the repository on your computer where you can work on it."

```bash
# Copy the repository URL from GitHub
git clone https://github.com/YOUR-USERNAME/todo-list.git

# Navigate into the project
cd todo-list
```

**💡 Explain:**
- **Clone**: Creates a local copy of a remote repository
- **Local vs Remote**: Local is on your computer, remote is on GitHub

---

### Step 3: Initialize Node.js Project

**🎤 Speaker Notes:**
> "We're building a Node.js application. Node.js allows us to run JavaScript on the server side, not just in browsers. Let's initialize our project."

```bash
npm init -y
```

**💡 Explain - What is `package.json`?**
- A manifest file for Node.js projects
- Contains project metadata (name, version, description)
- Lists all dependencies (packages your project needs)
- Defines scripts to run your application
- The `-y` flag accepts all defaults automatically

**🔍 Show Students:**
Open `package.json` and explain the structure:
```json
{
  "name": "todo-list",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  ...
}
```

---

### Step 4: Install Dependencies

**🎤 Speaker Notes:**
> "Instead of writing everything from scratch, we'll use packages - pre-written code that solves common problems. This is the power of the npm (Node Package Manager) ecosystem."

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
```

**Wait for installation... then install dev dependencies:**

```bash
npm install --save-dev nodemon
```

**💡 Explain Each Package:**

#### **Production Dependencies** (Required to run the app)

1. **express** 
   - Web framework for Node.js
   - Handles HTTP requests, routing, middleware
   - Think of it as the foundation for building web servers
   
2. **mongoose**
   - ODM (Object Data Modeling) library for MongoDB
   - Makes working with MongoDB easier
   - Provides schema structure, validation, and query helpers
   - Converts JavaScript objects to MongoDB documents

3. **bcryptjs**
   - Library for hashing passwords
   - **Hashing**: One-way encryption (cannot be reversed)
   - Example: "password123" → "$2a$10$N9qo8uLOickgx..." 
   - Even if database is hacked, passwords are safe

4. **jsonwebtoken (JWT)**
   - Creates and verifies authentication tokens
   - **JWT**: JSON Web Token - a secure way to transmit information
   - Used for stateless authentication
   - Structure: Header.Payload.Signature
   - Example use: After login, server sends JWT, client sends it back on each request

5. **dotenv**
   - Loads environment variables from `.env` file
   - Keeps sensitive data (passwords, secrets) out of code
   - Different environments (development, production) can have different values

6. **cors**
   - Cross-Origin Resource Sharing
   - Allows frontend and backend on different domains to communicate
   - Prevents browser security restrictions

#### **Development Dependencies** (Only for development)

7. **nodemon**
   - Auto-restarts server when files change
   - No need to manually stop and restart server
   - Huge time-saver during development

**🔍 Show Students:**
Open `package.json` again and show the dependencies section:
```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  ...
}
```

**💡 Explain the `^` symbol:**
- `^4.18.2` means "install 4.18.2 or any compatible newer version"
- First number = major version (breaking changes)
- Second number = minor version (new features)
- Third number = patch version (bug fixes)

---

### Step 5: Update package.json Scripts

**🎤 Speaker Notes:**
> "Let's add convenient scripts to start our application. Scripts are shortcuts that make running commands easier."

**Edit `package.json`:**
```json
{
  "name": "todo-list",
  "version": "1.0.0",
  "description": "Personal Task Tracker with JWT Authentication",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["todo", "task", "tracker", "jwt", "mongodb"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**💡 Explain:**
- `npm start` - Runs app in production mode
- `npm run dev` - Runs app with nodemon (auto-restart)
- `main: "server.js"` - Entry point of our application

---

### Step 6: Create Project Structure

**🎤 Speaker Notes:**
> "Good project organization is crucial. We'll follow the MVC-like pattern - separating concerns into different folders. This makes code maintainable and easy to understand."

```bash
mkdir models routes middleware public
mkdir public/js
```

**💡 Explain Folder Structure:**

```
todo-list/
├── models/          → Database schemas (User, Task)
├── routes/          → API endpoints (auth, tasks)
├── middleware/      → Request interceptors (authentication)
├── public/          → Frontend files (HTML, CSS, JS)
│   └── js/          → Client-side JavaScript
├── server.js        → Main application file
├── package.json     → Project configuration
└── .env             → Environment variables (secrets)
```

**📊 Draw on Board:** MVC-like Architecture
```
Request → Routes → Middleware → Controller → Model → Database
                                    ↓
Response ← View ← Controller ←──────┘
```

---

### Step 7: Setup Environment Variables

**🎤 Speaker Notes:**
> "We never hardcode sensitive information like database passwords or secret keys in our code. Instead, we use environment variables. The `.env` file stores these securely."

**Create `.env` file:**
```bash
# In the root directory
touch .env
```

**Edit `.env` file:**
```env
MONGODB_URI=
JWT_SECRET=
PORT=3000
```

**💡 Explain Each Variable:**

1. **MONGODB_URI** - Database connection string
   - We'll get this from MongoDB Atlas
   - Contains: database location, credentials, database name
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

2. **JWT_SECRET** - Secret key for signing tokens
   - Used to create and verify JWT tokens
   - Must be random and secure
   - If someone knows this, they can create fake tokens

3. **PORT** - Port number where server runs
   - Default: 3000 (5000 has conflicts on macOS)
   - URL will be: `http://localhost:3000`

**Create `.gitignore` file:**
```bash
touch .gitignore
```

**Edit `.gitignore`:**
```
node_modules/
.env
.DS_Store
```

**💡 Explain:**
- Never commit `node_modules` (too large, can be reinstalled)
- Never commit `.env` (contains secrets)
- `.DS_Store` is macOS system file (not needed)

---

### Step 8: Setup MongoDB Atlas

**🎤 Speaker Notes:**
> "MongoDB Atlas is a cloud database service. We'll use their free tier, which is perfect for learning and small projects. Let me walk you through the setup."

**📺 LIVE DEMO - Do this together with students:**

#### 8.1: Create MongoDB Atlas Account
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with Google/GitHub or email
4. Complete registration
```

#### 8.2: Create a Cluster
```
1. Choose "M0 Sandbox" (FREE tier)
2. Cloud Provider: AWS (or any)
3. Region: Choose closest to your location
4. Cluster Name: TaskTrackerCluster (or keep default)
5. Click "Create Cluster" (takes 3-5 minutes)
```

**💡 While Waiting, Explain:**
- **Cluster**: A group of servers storing your database
- **M0 Sandbox**: Free tier with 512MB storage (enough for learning)
- **Cloud Database**: Database hosted online, accessible from anywhere
- **Traditional vs Cloud**: No need to install/maintain database server

#### 8.3: Setup Database Access (Create User)
```
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: taskadmin (or your choice)
5. Password: Click "Autogenerate Secure Password" (COPY THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"
```

**⚠️ Important:** Tell students to save this password securely!

#### 8.4: Setup Network Access (Whitelist IP)
```
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, you'd specify exact IPs
   - For learning/development, this is fine
4. Click "Confirm"
```

**💡 Explain:**
- **Whitelist**: List of allowed IP addresses
- **0.0.0.0/0**: Allows any IP (convenient for learning)
- **Security**: In production, restrict to specific IPs

#### 8.5: Get Connection String
```
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Click "Connect your application"
4. Driver: Node.js
5. Version: 4.1 or later
6. Copy the connection string
   Example: mongodb+srv://taskadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 8.6: Update .env File
```env
MONGODB_URI=mongodb+srv://taskadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=
PORT=3000
```

**🔴 Important Changes:**
1. Replace `<password>` with your actual password
2. After `.mongodb.net/` add database name: `tasktracker`
3. Remove any `<` or `>` symbols

**💡 Explain Connection String Parts:**
```
mongodb+srv:// → Protocol (SRV for Atlas)
taskadmin → Username
:password → Password
@cluster0.xxxxx.mongodb.net → Cluster location
/tasktracker → Database name
?retryWrites=true&w=majority → Connection options
```

---

### Step 9: Generate JWT Secret

**🎤 Speaker Notes:**
> "We need a random, secure secret key for JWT tokens. Let's generate one using Node.js crypto module."

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**This outputs something like:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

**Copy and paste into `.env`:**
```env
MONGODB_URI=mongodb+srv://taskadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
PORT=3000
```

**💡 Explain:**
- `crypto.randomBytes(32)` generates 32 random bytes
- `.toString('hex')` converts to hexadecimal string
- Result: 64-character random string (very secure)

---

## ✅ End of Part 1 Checkpoint

**🎤 Speaker Notes:**
> "Great! We've completed the setup. Let's verify everything is in place before we start coding."

**Quick Check:**
```bash
# Should show all packages
ls node_modules/

# Should show project structure
ls -la

# Should show environment variables
cat .env
```

**💬 Q&A Time:** Take questions before moving to coding!

---

## **PART 2: DATABASE MODELS** (15 minutes)

**🎤 Speaker Notes:**
> "Now we'll create our database schemas. Think of schemas as blueprints - they define the structure of our data. We have two collections: users and tasks."

---

### File 1: `models/User.js`

**🎤 Speaker Notes:**
> "The User model handles user data and password security. We'll use Mongoose schemas to define structure and add methods for password hashing and comparison."

**Create the file:**
```bash
touch models/User.js
```

**💡 Before Coding - Explain Concepts:**

1. **Schema** - Blueprint defining structure, types, and validation
2. **Model** - Compiled version of schema (can query database)
3. **Pre-hook** - Function that runs before certain operations
4. **Methods** - Custom functions attached to documents

**📝 Type Together:**

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  // Generate salt (random data added to password)
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

**💡 Explain Each Section:**

**1. Schema Definition:**
```javascript
const userSchema = new mongoose.Schema({...})
```
- Defines structure of user documents
- Like creating a table structure in SQL

**2. Field Types:**
- `String`, `Number`, `Boolean`, `Date`, etc.
- `required`: Must provide value
- `unique`: No duplicates (email must be unique)
- `trim`: Removes whitespace
- `lowercase`: Converts to lowercase

**3. Timestamps:**
```javascript
{ timestamps: true }
```
- Automatically adds `createdAt` and `updatedAt` fields
- Tracks when record was created/modified

**4. Pre-Save Hook:**
```javascript
userSchema.pre('save', async function(next) {...})
```
- Runs automatically before saving to database
- We use it to hash passwords
- `this` refers to the document being saved

**5. Password Hashing:**
```javascript
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
```
- **Salt**: Random data added to password before hashing
- **genSalt(10)**: 10 rounds of hashing (higher = more secure but slower)
- **Why?** Even if two users have same password, hashes will be different

**Example:**
```
Original: "password123"
Salt: "$2a$10$N9qo8uLOickgx..."
Hashed: "$2a$10$N9qo8uLOickgx2.vPklT.ZvZXk1RgqXg7BJzqNqvW8jHmP7EWm.G6"
```

**6. Compare Method:**
```javascript
userSchema.methods.comparePassword = async function(candidatePassword) {...}
```
- Custom method to check if password is correct
- Used during login
- Compares plain text with hashed password

**7. Export Model:**
```javascript
module.exports = mongoose.model('User', userSchema);
```
- Creates a model from schema
- Collection name will be "users" (lowercase, plural)

---

### File 2: `models/Task.js`

**🎤 Speaker Notes:**
> "The Task model is simpler. It stores task information and links each task to a user using userId reference."

**Create the file:**
```bash
touch models/Task.js
```

**📝 Type Together:**

```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''  // Optional field with default value
  },
  status: {
    type: String,
    enum: ['Pending', 'Done'],  // Only these values allowed
    default: 'Pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to User
    ref: 'User',  // Which model to reference
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
```

**💡 Explain Key Concepts:**

**1. Enum:**
```javascript
enum: ['Pending', 'Done']
```
- Restricts values to specific options
- Database will reject any other value
- Ensures data consistency

**2. Default Values:**
```javascript
default: 'Pending'
```
- If no value provided, use this
- New tasks are "Pending" by default

**3. References (Foreign Key):**
```javascript
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}
```
- Links task to a user
- Similar to foreign key in SQL
- `ObjectId`: MongoDB's unique identifier format
- `ref: 'User'`: Points to User model

**📊 Draw on Board:** Data Relationship
```
User                    Task
----                    ----
_id: 123abc             _id: 789xyz
name: "John"            title: "Buy groceries"
email: "john@email"     userId: 123abc ←── References User
password: "hashed..."   status: "Pending"
```

---

## **PART 3: AUTHENTICATION MIDDLEWARE** (10 minutes)

**🎤 Speaker Notes:**
> "Middleware is code that runs between receiving a request and sending a response. Our auth middleware will check if the user is logged in before allowing access to protected routes."

---

### File 3: `middleware/auth.js`

**Create the file:**
```bash
touch middleware/auth.js
```

**💡 Before Coding - Explain:**

**What is Middleware?**
```
Request → Middleware → Route Handler → Response
          ↓
     (Check auth, log, validate, etc.)
```

**JWT Authentication Flow:**
```
1. User logs in → Server creates JWT
2. Client stores JWT (localStorage)
3. Client sends JWT with each request (Authorization header)
4. Middleware verifies JWT
5. If valid → Allow request
   If invalid → Reject request
```

**📝 Type Together:**

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Format: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user ID to request object
    req.userId = decoded.userId;
    
    // Continue to next middleware/route handler
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};

module.exports = authMiddleware;
```

**💡 Explain Each Part:**

**1. Authorization Header:**
```javascript
const token = req.headers.authorization?.split(' ')[1];
```
- Client sends: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- We extract token part after "Bearer "
- `?.` is optional chaining (safe if header doesn't exist)

**2. Token Verification:**
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```
- Checks if token is valid and not tampered with
- Uses JWT_SECRET to verify signature
- If invalid/expired, throws error (caught by catch block)
- Returns decoded payload: `{ userId: '123abc', iat: 1234567890, exp: 1234567890 }`

**3. Attach User ID:**
```javascript
req.userId = decoded.userId;
```
- Adds userId to request object
- Available in route handlers
- Tells us which user made the request

**4. next():**
```javascript
next();
```
- Continues to next middleware or route handler
- Without this, request hangs

**5. Error Handling:**
```javascript
catch (error) {
  return res.status(401).json({...});
}
```
- If anything goes wrong (invalid token, expired, etc.)
- Send 401 Unauthorized response

**💡 HTTP Status Codes:**
- `200` - OK (success)
- `201` - Created (successfully created resource)
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (not logged in/invalid credentials)
- `404` - Not Found
- `500` - Server Error

---

## **PART 4: API ROUTES** (30 minutes)

**🎤 Speaker Notes:**
> "Now we'll build our API endpoints. These are URLs that clients can call to perform actions. We have two route files: one for authentication (register/login) and one for tasks (CRUD operations)."

---

### File 4: `routes/auth.js`

**Create the file:**
```bash
touch routes/auth.js
```

**💡 Before Coding - Explain REST API:**

**REST (Representational State Transfer)** - Architectural style for APIs

**HTTP Methods:**
- `GET` - Retrieve data (Read)
- `POST` - Send data to create (Create)
- `PATCH/PUT` - Update data (Update)
- `DELETE` - Remove data (Delete)

**Our Auth Endpoints:**
- `POST /api/register` - Create new user
- `POST /api/login` - Login and get JWT token

**📝 Type Together:**

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register new user - POST /api/register
router.post('/register', async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Create new user (password will be auto-hashed by pre-save hook)
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Login user - POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password using our custom method
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },  // Payload (data stored in token)
      process.env.JWT_SECRET,  // Secret key
      { expiresIn: '7d' }  // Options (expires in 7 days)
    );

    // Send success response with token
    res.json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

module.exports = router;
```

**💡 Explain Key Sections:**

**1. Router Setup:**
```javascript
const router = express.Router();
```
- Creates a mini-app for routes
- Keeps routes organized in separate files

**2. Request Body:**
```javascript
const { name, email, password } = req.body;
```
- Data sent by client (JSON format)
- Destructuring to extract fields
- Express parses JSON automatically (with middleware)

**3. Async/Await:**
```javascript
async (req, res) => {
  await user.save();
}
```
- Handles asynchronous operations (database calls)
- `async` function can use `await`
- `await` pauses until operation completes
- Much cleaner than callbacks or promises

**4. Database Queries:**
```javascript
await User.findOne({ email });
await user.save();
```
- `findOne({ email })` - Find user where email matches
- `save()` - Insert document into database
- Returns Promise, so we use `await`

**5. JWT Generation:**
```javascript
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
```
- **Payload**: `{ userId: user._id }` - Data stored in token
- **Secret**: Used to sign token (verify authenticity)
- **Options**: `expiresIn: '7d'` - Token valid for 7 days

**JWT Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.    ← Header (algorithm, type)
eyJ1c2VySWQiOiIxMjNhYmMiLCJpYXQiOjE1MT.    ← Payload (data)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_a.     ← Signature (verification)
```

**6. Error Handling:**
```javascript
try {
  // code
} catch (error) {
  res.status(500).json({ success: false, message: '...' });
}
```
- Catches any errors
- Sends appropriate response
- Logs error for debugging

**💡 Security Note:**
- Don't reveal if email or password is wrong
- Always say "Invalid credentials" (prevents email enumeration)
- Never send password back to client

---

### File 5: `routes/tasks.js`

**Create the file:**
```bash
touch routes/tasks.js
```

**💡 Before Coding - Explain CRUD:**

**CRUD Operations:**
- **C**reate - POST /api/tasks
- **R**ead - GET /api/tasks
- **U**pdate - PATCH /api/tasks/:id
- **D**elete - DELETE /api/tasks/:id

**📝 Type Together:**

```javascript
const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all tasks for logged-in user - GET /api/tasks
router.get('/', async (req, res) => {
  try {
    // req.userId was set by auth middleware
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      tasks 
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching tasks' 
    });
  }
});

// Add new task - POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title is required' 
      });
    }

    const task = new Task({
      title,
      description: description || '',
      userId: req.userId  // From auth middleware
    });

    await task.save();

    res.status(201).json({ 
      success: true, 
      message: 'Task created successfully',
      task 
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating task' 
    });
  }
});

// Update task status - PATCH /api/tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Get ID from URL
    const { status } = req.body;

    // Validate status
    if (status && !['Pending', 'Done'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status value' 
      });
    }

    // Find task that belongs to this user
    const task = await Task.findOne({ _id: id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    task.status = status || 'Done';
    await task.save();

    res.json({ 
      success: true, 
      message: 'Task updated successfully',
      task 
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating task' 
    });
  }
});

// Delete task - DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete in one operation
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting task' 
    });
  }
});

module.exports = router;
```

**💡 Explain Key Concepts:**

**1. Apply Middleware to All Routes:**
```javascript
router.use(authMiddleware);
```
- All routes below this line require authentication
- Middleware runs before route handlers
- If auth fails, request stops here

**2. Route Parameters:**
```javascript
router.patch('/:id', ...)
const { id } = req.params;
```
- `:id` is a placeholder in URL
- Example: `/api/tasks/abc123` → `req.params.id = 'abc123'`
- Dynamic URLs

**3. Query with Multiple Conditions:**
```javascript
Task.find({ userId: req.userId })
```
- Only get tasks belonging to logged-in user
- User isolation (users can't see others' tasks)

**4. Sorting:**
```javascript
.sort({ createdAt: -1 })
```
- Sort by createdAt field
- `-1` = descending (newest first)
- `1` = ascending (oldest first)

**5. Security Check:**
```javascript
Task.findOne({ _id: id, userId: req.userId })
```
- Verify task belongs to user
- Prevents users from modifying others' tasks
- Authorization check

**6. Mongoose Methods:**
- `find()` - Get multiple documents
- `findOne()` - Get single document
- `findOneAndDelete()` - Find and delete in one operation
- `save()` - Insert or update document

---

## **PART 5: MAIN SERVER FILE** (15 minutes)

**🎤 Speaker Notes:**
> "Now we'll create the main server file that ties everything together. This is the entry point of our application."

---

### File 6: `server.js`

**Create the file:**
```bash
touch server.js
```

**💡 Before Coding - Explain Server Architecture:**

```
server.js (Main Entry Point)
  ├── Load environment variables
  ├── Connect to MongoDB
  ├── Setup Express app
  ├── Apply middleware (cors, json parser)
  ├── Mount routes
  ├── Serve static files (HTML, CSS, JS)
  └── Start listening on port
```

**📝 Type Together:**

```javascript
require('dotenv').config();  // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);  // Exit if database connection fails
});

// API Routes
app.use('/api', authRoutes);  // /api/register, /api/login
app.use('/api/tasks', taskRoutes);  // /api/tasks, /api/tasks/:id

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**💡 Explain Each Section:**

**1. Dotenv:**
```javascript
require('dotenv').config();
```
- Must be first line
- Loads variables from `.env` into `process.env`
- Now we can access `process.env.MONGODB_URI`

**2. Express App:**
```javascript
const app = express();
```
- Creates Express application instance
- `app` is our web server

**3. Middleware Order Matters:**
```javascript
app.use(cors());
app.use(express.json());
app.use(express.static(...));
```
- Executed in order from top to bottom
- Each middleware processes request before next one

**4. CORS:**
```javascript
app.use(cors());
```
- Allows frontend on different domain to call API
- Without this, browser blocks requests (security feature)
- Enables communication between localhost:3000 (backend) and other origins

**5. JSON Parser:**
```javascript
app.use(express.json());
```
- Parses JSON request bodies
- Makes `req.body` available
- Without this, `req.body` would be undefined

**6. Static Files:**
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```
- Serves files from `public` folder
- `http://localhost:3000/styles.css` → serves `public/styles.css`
- `__dirname` is current directory path

**7. MongoDB Connection:**
```javascript
mongoose.connect(process.env.MONGODB_URI, {...})
```
- Connects to MongoDB Atlas
- Returns a Promise
- `.then()` runs if successful
- `.catch()` runs if error occurs

**8. Mounting Routes:**
```javascript
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);
```
- Attaches route modules to specific paths
- `/api` prefix for auth routes
- `/api/tasks` prefix for task routes

**Route Resolution Example:**
```
authRoutes has: router.post('/register', ...)
Mounted at: app.use('/api', authRoutes)
Final URL: POST /api/register
```

**9. HTML Routes:**
```javascript
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
```
- Serves HTML pages for specific routes
- `path.join()` creates cross-platform file paths
- `/` → login page (home)
- `/register` → registration page
- `/dashboard` → dashboard page

**10. 404 Handler:**
```javascript
app.use((req, res) => {...});
```
- Catches all unmatched routes
- Must be after all other routes
- Sends 404 error

**11. Error Handler:**
```javascript
app.use((err, req, res, next) => {...});
```
- Catches errors from anywhere in app
- Must have 4 parameters (err, req, res, next)
- Last middleware

**12. Start Server:**
```javascript
app.listen(PORT, () => {...});
```
- Starts server on specified port
- Server begins accepting connections
- Callback runs when server is ready

---

## ✅ Backend Complete! Let's Test

**🎤 Speaker Notes:**
> "Great! Our backend is complete. Let's test it before building the frontend."

**Start the server:**
```bash
npm run dev
```

**You should see:**
```
[nodemon] 3.1.10
[nodemon] starting `node server.js`
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
```

**✅ Success Indicators:**
- No errors in terminal
- MongoDB connection successful
- Server running message appears

**❌ Common Errors:**

**Error: MongoDB connection failed**
```
Solution:
- Check MONGODB_URI in .env
- Verify password has no special characters
- Check Network Access in Atlas (IP whitelist)
```

**Error: PORT already in use**
```
Solution:
- Change PORT in .env to different number (3001, 8000, etc.)
- Or kill process: lsof -ti:3000 | xargs kill -9
```

---

## ☕ BREAK TIME (10 minutes)

**💬 Discussion Topics:**
- Questions about backend?
- Understanding of authentication flow?
- Any confusion about MongoDB/Mongoose?

---

## **PART 6: FRONTEND - HTML PAGES** (30 minutes)

**🎤 Speaker Notes:**
> "Now let's build the user interface. We'll create three HTML pages using Bootstrap 5 for styling. Bootstrap is a CSS framework that provides pre-built components and utilities."

**💡 Explain Bootstrap:**
- CSS framework (pre-written CSS classes)
- Responsive (works on all devices)
- Components: buttons, forms, cards, navbar, etc.
- Grid system for layouts
- CDN: Load from URL (no installation needed)

---

### File 7: `public/login.html`

**Create the file:**
```bash
touch public/login.html
```

**💡 Structure Overview:**
```
HTML Document
  ├── Head (metadata, CSS links)
  └── Body
      └── Form (email, password, submit)
```

**📝 Type Together (or show and explain):**

**I'll highlight key Bootstrap concepts:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Task Tracker</title>
  
  <!-- Bootstrap CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
  
  <!-- Custom Styles -->
  <style>
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .auth-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      padding: 40px;
      max-width: 450px;
      width: 100%;
    }
    .auth-title {
      color: #667eea;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      padding: 12px;
      font-weight: 500;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="auth-card">
          <!-- Title -->
          <h2 class="text-center auth-title">
            <i class="bi bi-box-arrow-in-right"></i> Welcome Back
          </h2>
          
          <!-- Alert Container (for error/success messages) -->
          <div id="alertContainer"></div>
          
          <!-- Login Form -->
          <form id="loginForm">
            <div class="mb-3">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" required>
            </div>
            
            <button type="submit" class="btn btn-primary w-100 mb-3">
              <span id="btnText">Login</span>
              <span id="btnSpinner" class="spinner-border spinner-border-sm d-none" role="status"></span>
            </button>
          </form>
          
          <!-- Register Link -->
          <div class="text-center">
            <p class="mb-0">Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Our custom JavaScript -->
  <script src="js/login.js"></script>
</body>
</html>
```

**💡 Explain Key Bootstrap Classes:**

**Layout Classes:**
```html
<div class="container">        - Fixed width container
<div class="row">              - Flex row
<div class="col-md-6">         - 6 columns wide on medium+ screens
<div class="justify-content-center"> - Center content
```

**Form Classes:**
```html
<div class="mb-3">             - Margin bottom 3
<label class="form-label">     - Styled label
<input class="form-control">   - Styled input
```

**Button Classes:**
```html
<button class="btn btn-primary w-100 mb-3">
btn = button base class
btn-primary = primary color
w-100 = width 100%
mb-3 = margin bottom 3
```

**Utility Classes:**
```html
text-center = center text
d-none = display none
```

**Bootstrap Icons:**
```html
<i class="bi bi-box-arrow-in-right"></i>
```
- Icon library
- Thousands of icons available
- Just add class name

---

### File 8: `public/register.html`

**🎤 Speaker Notes:**
> "Registration page is very similar to login, with an additional field for name."

**Create the file:**
```bash
touch public/register.html
```

**📝 Quick Create (similar to login):**
Just show the key differences:

```html
<!-- Change title -->
<h2 class="text-center auth-title">
  <i class="bi bi-person-plus-fill"></i> Create Account
</h2>

<!-- Add name field -->
<div class="mb-3">
  <label for="name" class="form-label">Full Name</label>
  <input type="text" class="form-control" id="name" required>
</div>

<!-- Password hint -->
<div class="form-text">Password must be at least 6 characters</div>

<!-- Change link -->
<p class="mb-0">Already have an account? <a href="/">Login here</a></p>

<!-- Change script -->
<script src="js/register.js"></script>
```

---

### File 9: `public/dashboard.html`

**🎤 Speaker Notes:**
> "The dashboard is more complex. It has a navbar, form to add tasks, task statistics, and a list of tasks."

**Create the file:**
```bash
touch public/dashboard.html
```

**💡 Structure Overview:**
```
Dashboard
  ├── Navbar (logo, user name, logout)
  ├── Add Task Form
  ├── Statistics Cards (total, completed)
  └── Tasks List (dynamic content)
```

**📝 Show Key Sections (full file provided in project):**

**Navbar:**
```html
<nav class="navbar navbar-dark">
  <div class="container">
    <span class="navbar-brand">
      <i class="bi bi-check2-square"></i> My Task Tracker
    </span>
    <div class="d-flex align-items-center text-white">
      <span class="me-3">Welcome, <strong id="userName"></strong></span>
      <button class="btn btn-light btn-sm" onclick="logout()">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>
  </div>
</nav>
```

**Add Task Form:**
```html
<form id="addTaskForm">
  <div class="row">
    <div class="col-md-5 mb-3">
      <input type="text" id="taskTitle" placeholder="Task Title" required>
    </div>
    <div class="col-md-5 mb-3">
      <input type="text" id="taskDescription" placeholder="Description">
    </div>
    <div class="col-md-2 mb-3">
      <button type="submit" class="btn btn-primary w-100">
        <i class="bi bi-plus-lg"></i> Add
      </button>
    </div>
  </div>
</form>
```

**Task Card Template (JavaScript will populate):**
```html
<div class="task-card">
  <h5 class="task-title">Task Title</h5>
  <p class="task-description">Description</p>
  <span class="task-status status-pending">Pending</span>
  <button class="btn btn-success">Done</button>
  <button class="btn btn-danger">Delete</button>
</div>
```

---

## **PART 7: FRONTEND - JAVASCRIPT** (40 minutes)

**🎤 Speaker Notes:**
> "Now we'll add interactivity with JavaScript. We'll make API calls using the Fetch API, handle forms, and dynamically update the page."

**💡 Explain Fetch API:**
```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

- Modern way to make HTTP requests
- Replaces XMLHttpRequest
- Returns Promises
- Async/await makes it cleaner

---

### File 10: `public/js/register.js`

**Create the file:**
```bash
touch public/js/register.js
```

**💡 Flow:**
```
1. User fills form
2. User clicks submit
3. Prevent default form submission
4. Get form data
5. Send POST request to /api/register
6. Show success message
7. Redirect to login page
```

**📝 Type Together:**

```javascript
const API_URL = window.location.origin;  // http://localhost:3000

// Get DOM elements
const registerForm = document.getElementById('registerForm');
const alertContainer = document.getElementById('alertContainer');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');

// Function to show alert messages
function showAlert(message, type = 'danger') {
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// Handle form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();  // Prevent default form submission
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Show loading state
  btnText.classList.add('d-none');
  btnSpinner.classList.remove('d-none');
  
  try {
    // Make API request
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showAlert('Registration successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '/';  // Redirect to login
      }, 1500);
    } else {
      showAlert(data.message || 'Registration failed', 'danger');
      // Reset button
      btnText.classList.remove('d-none');
      btnSpinner.classList.add('d-none');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showAlert('An error occurred. Please try again.', 'danger');
    btnText.classList.remove('d-none');
    btnSpinner.classList.add('d-none');
  }
});
```

**💡 Explain Key Concepts:**

**1. DOM Selection:**
```javascript
const registerForm = document.getElementById('registerForm');
```
- Gets HTML element by ID
- Store in variable for reuse

**2. Event Listener:**
```javascript
registerForm.addEventListener('submit', async (e) => {...});
```
- Listens for form submission
- Runs function when event occurs
- `e` = event object

**3. Prevent Default:**
```javascript
e.preventDefault();
```
- Stops form from submitting normally
- We handle submission with JavaScript instead
- Without this, page refreshes

**4. Get Input Values:**
```javascript
const email = document.getElementById('email').value.trim();
```
- `.value` gets input value
- `.trim()` removes whitespace

**5. Fetch Request:**
```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});
```
- `method`: HTTP method (POST, GET, etc.)
- `headers`: Request metadata
- `Content-Type`: Tells server we're sending JSON
- `body`: Request data (must be string, so use JSON.stringify)

**6. Parse Response:**
```javascript
const data = await response.json();
```
- Converts JSON string to JavaScript object
- Returns a Promise

**7. Check Success:**
```javascript
if (data.success) {...}
```
- Check response from server
- Handle success/error differently

**8. Loading State:**
```javascript
btnText.classList.add('d-none');      // Hide text
btnSpinner.classList.remove('d-none');  // Show spinner
```
- Visual feedback to user
- Shows request is in progress
- Better UX

**9. Redirect:**
```javascript
window.location.href = '/';
```
- Navigate to different page
- `setTimeout` adds small delay (user can see success message)

---

### File 11: `public/js/login.js`

**🎤 Speaker Notes:**
> "Login is similar to register, but we also need to store the JWT token."

**Create the file:**
```bash
touch public/js/login.js
```

**📝 Key Differences from Register:**

```javascript
// Check if already logged in
if (localStorage.getItem('token')) {
  window.location.href = '/dashboard';
}

// After successful login
if (data.success) {
  // Store token and user info
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  showAlert('Login successful! Redirecting...', 'success');
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 1000);
}
```

**💡 Explain localStorage:**
```javascript
localStorage.setItem('key', 'value');  // Store
localStorage.getItem('key');           // Retrieve
localStorage.removeItem('key');        // Delete
localStorage.clear();                  // Delete all
```

- Browser storage (persists across sessions)
- Stores key-value pairs (strings only)
- 5-10MB storage limit
- Perfect for storing tokens
- Can be inspected in DevTools

**⚠️ Security Note:**
- localStorage accessible by JavaScript
- Vulnerable to XSS (Cross-Site Scripting) attacks
- For production, consider httpOnly cookies
- For learning, localStorage is fine

---

### File 12: `public/js/dashboard.js`

**🎤 Speaker Notes:**
> "This is the most complex JavaScript file. It handles task CRUD operations and dynamic UI updates."

**Create the file:**
```bash
touch public/js/dashboard.js
```

**💡 Flow:**
```
1. Check authentication (redirect if not logged in)
2. Display user name
3. Fetch and display tasks
4. Handle add task
5. Handle mark done/pending
6. Handle delete task
7. Handle logout
```

**📝 Type Together (explain as you go):**

**Authentication Check:**
```javascript
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token) {
  window.location.href = '/';  // Redirect to login
}

document.getElementById('userName').textContent = user.name || 'User';
```

**Logout Function:**
```javascript
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}
```

**Fetch Tasks:**
```javascript
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Send JWT token
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      renderTasks(data.tasks);
    } else {
      if (response.status === 401) {
        logout();  // Token invalid, logout
      }
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}
```

**💡 Explain Authorization Header:**
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```
- Required for protected routes
- Format: "Bearer <token>"
- Server extracts and verifies token
- Identifies which user made request

**Render Tasks:**
```javascript
function renderTasks(tasks) {
  if (tasks.length === 0) {
    showEmptyState();
    return;
  }
  
  tasksList.innerHTML = tasks.map(task => `
    <div class="task-card ${task.status === 'Done' ? 'done' : ''}">
      <h5 class="task-title">${escapeHtml(task.title)}</h5>
      ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
      <span class="task-status">${task.status}</span>
      ${task.status === 'Pending' ? `
        <button onclick="markAsDone('${task._id}')">Done</button>
      ` : `
        <button onclick="markAsPending('${task._id}')">Undo</button>
      `}
      <button onclick="deleteTask('${task._id}')">Delete</button>
    </div>
  `).join('');
  
  updateStats(tasks);
}
```

**💡 Explain:**
- `.map()` transforms array into HTML strings
- `.join('')` combines array into single string
- Template literals for dynamic HTML
- Conditional rendering with ternary operator
- `escapeHtml()` prevents XSS attacks

**XSS Prevention:**
```javascript
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```
- Escapes HTML special characters
- Prevents malicious code injection
- Always sanitize user input before displaying

**Add Task:**
```javascript
addTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();
  
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });
  
  const data = await response.json();
  
  if (data.success) {
    addTaskForm.reset();  // Clear form
    fetchTasks();  // Refresh task list
  }
});
```

**Mark as Done:**
```javascript
async function markAsDone(taskId) {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status: 'Done' })
  });
  
  if (response.ok) {
    fetchTasks();  // Refresh
  }
}
```

**Delete Task:**
```javascript
async function deleteTask(taskId) {
  if (!confirm('Are you sure?')) return;
  
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.ok) {
    fetchTasks();
  }
}
```

**💡 Explain:**
- Each operation makes API call
- After success, refresh task list
- `confirm()` shows browser confirmation dialog
- `response.ok` checks if status is 200-299

**Initial Load:**
```javascript
// Load tasks when page loads
fetchTasks();
```

---

## ✅ Complete App Testing

**🎤 Speaker Notes:**
> "Congratulations! We've built a complete full-stack application. Now let's test everything together."

### Testing Checklist:

**1. Start Server:**
```bash
npm run dev
```

**2. Register New User:**
```
- Go to http://localhost:3000/register
- Fill form (name, email, password)
- Click Register
- Should redirect to login
```

**3. Login:**
```
- Enter registered email and password
- Click Login
- Should redirect to dashboard
- Check that user name appears in navbar
```

**4. Add Tasks:**
```
- Fill task title
- Add description (optional)
- Click Add
- Task should appear in list
- Check statistics update
```

**5. Mark as Done:**
```
- Click "Done" button on a task
- Task should have strikethrough
- Status changes to "Done"
- Completed count increases
```

**6. Mark as Pending:**
```
- Click "Undo" button on completed task
- Task returns to normal
- Status changes to "Pending"
```

**7. Delete Task:**
```
- Click "Delete" button
- Confirm deletion
- Task disappears from list
- Statistics update
```

**8. Logout:**
```
- Click "Logout" button
- Redirects to login page
- Cannot access dashboard (try going to /dashboard)
```

**9. Test Protection:**
```
- Clear localStorage in DevTools (Application tab)
- Try to access /dashboard
- Should redirect to login
```

---

## 🎉 Wrap Up & Next Steps

**🎤 Final Speaker Notes:**
> "Excellent work! You've just built a production-ready full-stack application from scratch. This project demonstrates all the core concepts of modern web development."

### What Students Learned:

**Backend:**
✅ Node.js and Express server setup  
✅ MongoDB database modeling  
✅ RESTful API design  
✅ JWT authentication  
✅ Password hashing and security  
✅ Middleware concepts  
✅ Error handling  
✅ Environment variables

**Frontend:**
✅ HTML5 structure  
✅ Bootstrap framework  
✅ Responsive design  
✅ JavaScript event handling  
✅ Fetch API and HTTP requests  
✅ DOM manipulation  
✅ localStorage for client-side storage  
✅ XSS prevention

**Concepts:**
✅ Full-stack architecture  
✅ Client-server communication  
✅ Authentication vs Authorization  
✅ CRUD operations  
✅ API design patterns  
✅ Security best practices

---

## 🚀 Deployment (Optional - Extra Session)

**If you have time, show students how to deploy:**

### Deploy Backend (Render/Railway):
```
1. Push code to GitHub
2. Connect Render/Railway to repo
3. Add environment variables
4. Deploy!
```

### Deploy Frontend (Netlify/Vercel):
```
- For separate deployment
- Or serve from Express (as we do now)
```

---

## 📚 Resources for Students

**Documentation:**
- Express: https://expressjs.com/
- Mongoose: https://mongoosejs.com/
- JWT: https://jwt.io/
- Bootstrap: https://getbootstrap.com/

**Practice Projects:**
- Add due dates to tasks
- Add task priorities (High, Medium, Low)
- Add task categories
- Add task search/filter
- Add email verification
- Add password reset
- Add profile page
- Add task sharing

**Learning Path:**
1. Master JavaScript ES6+
2. Learn React/Vue/Angular (frontend frameworks)
3. Learn TypeScript
4. Learn Docker (containerization)
5. Learn CI/CD (automated deployment)
6. Learn testing (Jest, Mocha)

---

## 💾 Save Project to GitHub

**Final Step - Commit and Push:**

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Complete Personal Task Tracker application"

# Add remote (use your GitHub repo URL)
git remote add origin https://github.com/YOUR-USERNAME/todo-list.git

# Push to GitHub
git push -u origin master
```

---

## 📝 Post-Session Feedback

**Questions to Ask Students:**
1. What was the most challenging part?
2. What concept was most interesting?
3. What would you like to learn more about?
4. What feature would you add to this project?

---

## 🎓 Certificate of Completion

**Consider giving students:**
- Certificate for completing the workshop
- GitHub repository as portfolio project
- Recommendation to add to LinkedIn

---

## 📧 Follow-Up

**Send students:**
- Link to GitHub repo
- This teaching guide
- Additional resources
- Practice exercise ideas
- Your contact for questions

---

**END OF SESSION**

**Total Duration: ~3 hours**

Good luck with your session! 🚀

---

## Quick Reference Commands

```bash
# Start project
npm run dev

# Kill port (if needed)
lsof -ti:3000 | xargs kill -9

# Install packages
npm install

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Check MongoDB connection
# (in server.js console output)

# Git commands
git add .
git commit -m "message"
git push origin master
```

---

## Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| Can't connect to MongoDB | Check MONGODB_URI, IP whitelist, password |
| Port already in use | Change PORT in .env or kill process |
| Token invalid | Clear localStorage and login again |
| CORS error | Ensure cors() middleware is applied |
| Can't install packages | Delete node_modules, run npm install |
| Password not hashing | Check User model pre-save hook |
| Tasks not showing | Check userId in auth middleware |


