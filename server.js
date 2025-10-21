const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Game State
const gameState = {
  players: new Map(),
  rooms: new Map(),
  games: new Map(),
  killCooldowns: new Map(),
  meetingDuration: 90,
  gameTimer: null,
  timeRemaining: 300 // 5 minutes in seconds
};

// Player tasks
const CREWMATE_TASKS = [
  { id: 'network', name: 'Network Security Log', duration: 120 },
  { id: 'phishing', name: 'Phishing Email Sort', duration: 180 },
  { id: 'firewall', name: 'Firewall Construction', duration: 150 },
  { id: 'encryption', name: 'Data Encryption', duration: 100 },
  { id: 'backup', name: 'System Backup', duration: 90 }
];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes - UPDATED TO index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // CHANGED
});

app.get('/impostor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'impostor.html'));
});

app.get('/crewmate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crewmate.html'));
});

app.get('/voting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'voting.html'));
});

// ... (REST OF YOUR SERVER CODE REMAINS EXACTLY THE SAME)
// All the socket.io event handlers, game logic, etc. stay unchanged

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Among Us Cyber Server running on port ${PORT}`);
  console.log(`🌍 Players worldwide can join!`);
});