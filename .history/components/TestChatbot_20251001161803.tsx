import { useState } from "react";

const TestChatbot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setResponse("");
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: [],
          userInfo: {
            name: "Test User",
            email: "test@test.com"
          }
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.response);
      } else {
        setResponse("Error: " + res.status);
      }
    } catch (error) {
      setResponse("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      background: 'white', 
      border: '2px solid #000', 
      padding: '20px', 
      borderRadius: '10px',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <h3>🧪 Test Chatbot Gemini</h3>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      {response && (
        <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
          <strong>Respuesta:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default TestChatbot;
