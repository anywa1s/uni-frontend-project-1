const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const users = [];

// Маршрут для регистрации
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;

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

// Маршрут для логина
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Неверный email или пароль' });
  }

  res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token: 'fake-jwt-token-' + user.id
  });
});

app.get('/api/auth/me', (req, res) => {
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

  res.json({ id: user.id, email: user.email, name: user.name });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});