const { spawn } = require('child_process');
const path = require('path');

console.log('================================================================');
console.log('  STARTING GOPCA MERN STACK PORTAL');
console.log('  Backend  : http://localhost:5000');
console.log('  Frontend : http://localhost:5173');
console.log('================================================================\n');

// Start Express Backend
const server = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Start Vite Client
const client = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

client.on('error', (err) => {
  console.error('Failed to start client:', err);
});

process.on('SIGINT', () => {
  console.log('\nShutting down GOPCA services...');
  server.kill();
  client.kill();
  process.exit(0);
});
