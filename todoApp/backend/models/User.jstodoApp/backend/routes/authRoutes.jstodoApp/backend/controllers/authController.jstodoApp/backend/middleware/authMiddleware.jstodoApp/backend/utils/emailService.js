**File: todoApp/backend/models/User.js**

```javascript
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: false,
});

module.exports = User;
```

**File: todoApp/backend/routes/authRoutes.js**

```javascript
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
```

**File: todoApp/backend/controllers/authController.js**

```javascript
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

**File: todoApp/backend/middleware/authMiddleware.js**

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
```

**File: todoApp/backend/utils/emailService.js**

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'your_email@example.com',
    pass: 'your_password',
  },
});

module.exports = {
  sendVerificationEmail: async (email, token) => {
    try {
      await transporter.sendMail({
        from: '"Your Company" <your_email@example.com>',
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email using this token: ${token}`,
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  },
};
```