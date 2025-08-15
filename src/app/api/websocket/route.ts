import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// WebSocket server should only be initialized when the route is actually called
let wss: any = null;

function initializeWebSocketServer() {
  if (typeof window === 'undefined' && !wss) {
    // Only import ws on the server side
    const { WebSocketServer } = require('ws');
    
    try {
      wss = new WebSocketServer({ port: 3001 });
      
      wss.on('connection', (ws: any) => {
        console.log('Client connected');

        // Send initial data
        const sendInitialData = async () => {
          try {
            const response = await fetch(
              'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false',
              {
                headers: {
                  'Accept': 'application/json',
                },
              }
            );

            if (!response.ok) {
              throw new Error(`CoinGecko API error: ${response.statusText}`);
            }

            const data = await response.json();
            ws.send(JSON.stringify(data));
          } catch (error) {
            console.error('Error fetching initial data:', error);
          }
        };

        sendInitialData();

        // Set up interval for updates
        const interval = setInterval(sendInitialData, 10000);

        ws.on('close', () => {
          console.log('Client disconnected');
          clearInterval(interval);
        });

        ws.on('error', (error: any) => {
          console.error('WebSocket error:', error);
        });
      });

      wss.on('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
          console.log('Port 3001 is already in use, WebSocket server not started');
        } else {
          console.error('WebSocket server error:', error);
        }
      });

    } catch (error) {
      console.error('Failed to initialize WebSocket server:', error);
    }
  }
}

export async function GET() {
  // Initialize WebSocket server when the route is called
  initializeWebSocketServer();
  
  return NextResponse.json({ 
    message: 'WebSocket server is running',
    status: wss ? 'active' : 'failed to start'
  });
} 