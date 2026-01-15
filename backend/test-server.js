const express = require('express');

const app = express();
const PORT = 5000;

console.log('Creating express app...');

app.get('/test', (req, res) => {
  res.json({ message: 'Test OK' });
});

console.log('Starting server on port ' + PORT);

const server = app.listen(PORT, '0.0.0.0', function() {
  console.log('Server callback fired - listening on port ' + PORT);
  const address = server.address();
  console.log('Server address:', JSON.stringify(address));
});

server.on('listening', () => {
  console.log('Server "listening" event fired');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

console.log('listen() call completed');
console.log('Process PID:', process.pid);

setTimeout(() => {
  console.log('Server still running after 5 seconds');
}, 5000);
