const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const users = [];

// middleware для проверки авторизации
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  const token = authHeader.split(' ')[1];
  const userId = token.split('-').pop();

  const user = users.find(u => u.id == userId);

  if (!user) {
    return res.status(401).json({ message: 'Пользователь не найден' });
  }

  req.user = user;
  next();
};

// маршрут для регистрации
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  const newUser = { id: Date.now(), email, password, name };
  users.push(newUser);

  console.log('Новый пользователь:', newUser);

  res.status(201).json({
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token: 'fake-jwt-token-' + newUser.id
  });
});

// маршрут для логина
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Неверный email или пароль' });
  }

  res.json({
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    },
    token: 'fake-jwt-token-' + user.id
  });
});

// маршрут для получения текущего пользователя
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, name: req.user.name });
});

// обновление имени пользователя
app.patch('/api/user/name', authenticateToken, (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Имя не может быть пустым' });
  }

  req.user.name = name;

  console.log('Имя пользователя обновлено:', req.user);

  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    message: 'Имя успешно обновлено'
  });
});

// обновление полного профиля
app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { name, email, password } = req.body;

  if (email && email !== req.user.email) {
    const emailExists = users.find(u => u.email === email && u.id !== req.user.id);
    if (emailExists) {
      return res.status(400).json({ message: 'Email уже используется' });
    }
    req.user.email = email;
  }

  if (name && name.trim() !== '') {
    req.user.name = name;
  }

  if (password && password.trim() !== '') {
    req.user.password = password;
  }

  console.log('Профиль пользователя обновлен:', req.user);

  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    message: 'Профиль успешно обновлен'
  });
});

// удаление аккаунта
app.delete('/api/user/account', authenticateToken, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  const deletedUser = users.splice(userIndex, 1);

  console.log('Пользователь удален:', deletedUser[0]);

  res.json({ message: 'Аккаунт успешно удален' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});