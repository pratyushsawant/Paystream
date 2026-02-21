// server.js
// Express server that streams PayStream events to the React frontend
// using Server-Sent Events (SSE) — a simple one-way real-time connection.
// Run with: node server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { runMainAgent } = require('./agentService');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// GET /api/run?task=...&budget=...
// Starts the PayStream agent and streams events back to the frontend
// using Server-Sent Events. The frontend listens with EventSource.
// ─────────────────────────────────────────────
app.get('/api/run', async (req, res) => {
  const task = req.query.task;
  const budget = parseFloat(req.query.budget);

  if (!task || isNaN(budget)) {
    return res.status(400).json({ error: 'Missing task or budget' });
  }

  console.log('\nNew run request:');
  console.log('Task:   ' + task);
  console.log('Budget: ' + budget + ' HBAR');

  // Set up SSE headers
  // SSE = a simple HTTP connection that stays open and streams text events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Helper to send an event to the frontend
  const sendEvent = (data) => {
    res.write('data: ' + JSON.stringify(data) + '\n\n');
  };

  try {
    await runMainAgent(task, budget, sendEvent);
  } catch (err) {
    console.error('Agent error:', err.message);
    sendEvent({ type: 'error', message: err.message });
  }

  res.end();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PayStream server is running' });
});

app.listen(PORT, () => {
  console.log('PayStream server running on http://localhost:' + PORT);
  console.log('Ready to receive requests from the frontend.');
});
