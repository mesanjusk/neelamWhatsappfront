import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/whatsapp';

const WhatsAppSessionManager = () => {
  const [userId, setUserId] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [sessionStatus, setSessionStatus] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState('');

  const startSession = async () => {
    setSessionStatus('Starting...');
    setQrCode(null);
    try {
      const res = await axios.get(`${API_BASE}/start/${userId}`);
      setSessionStatus(res.data.status);
      if (res.data.qr) setQrCode(res.data.qr);
    } catch (err) {
      setSessionStatus('Failed to start session');
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(`${API_BASE}/send/${userId}`, {
        number,
        message
      });
      setSendStatus(res.data.status);
    } catch (err) {
      setSendStatus('Error sending message');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800">📱 WhatsApp API</h2>

      <input
        type="text"
        placeholder="User ID (e.g. user123)"
        className="w-full border p-2 rounded"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button
        onClick={startSession}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Start WhatsApp Session
      </button>

      {sessionStatus && (
        <p className="text-sm text-gray-700">Status: {sessionStatus}</p>
      )}

      {qrCode && (
        <div className="text-center">
          <img src={qrCode} alt="QR Code" className="mx-auto my-2" />
          <p className="text-sm text-gray-600">Scan QR in WhatsApp</p>
        </div>
      )}

      <hr className="my-4" />

      <input
        type="text"
        placeholder="WhatsApp number (e.g. 919999999999)"
        className="w-full border p-2 rounded"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <textarea
        placeholder="Your message..."
        className="w-full border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        onClick={sendMessage}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        disabled={!userId}
      >
        Send Message
      </button>

      {sendStatus && (
        <p className="text-sm text-gray-700">Send Status: {sendStatus}</p>
      )}
    </div>
  );
};

export default WhatsAppSessionManager;
