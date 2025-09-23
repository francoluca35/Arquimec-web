import React, { useState } from 'react';
import Head from 'next/head';
import EnhancedAnimatedLogo from '../components/EnhancedAnimatedLogo';

const EnhancedLogoDemo: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Head>
        <title>Logo Animado ARQUIMEC - Versión Mejorada</title>
        <meta name="description" content="Logo animado mejorado de ARQUIMEC con efectos visuales avanzados" />
      </Head>
      
      <div className="demo-container">
        <div className="demo-header">
          <h1>Logo Animado ARQUIMEC</h1>
          <p>Versión mejorada con efectos visuales avanzados</p>
          <div className="info-toggle">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="info-button"
            >
              {showInfo ? 'Ocultar' : 'Mostrar'} Información
            </button>
          </div>
        </div>

        {showInfo && (
          <div className="info-panel">
            <h3>Características del Logo Animado:</h3>
            <ul>
              <li>✨ Formación progresiva de las letras A y M</li>
              <li>🎨 Efectos de brillo y sombras</li>
              <li>💫 Partículas de fondo animadas</li>
              <li>🔥 Efecto de desarme con partículas</li>
              <li>📝 Aparición del texto ARQUIMEC letra por letra</li>
              <li>📱 Diseño completamente responsivo</li>
            </ul>
          </div>
        )}
        
        <EnhancedAnimatedLogo />
        
        <div className="demo-controls">
          <button 
            onClick={() => window.location.reload()} 
            className="restart-button"
          >
            🔄 Reiniciar Animación
          </button>
        </div>
      </div>

      <style jsx>{`
        .demo-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
          color: white;
          font-family: 'Arial', sans-serif;
          position: relative;
        }

        .demo-header {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
          max-width: 600px;
          width: 90%;
        }

        .demo-header h1 {
          font-size: 2.8rem;
          margin: 0 0 10px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          background: linear-gradient(45deg, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .demo-header p {
          font-size: 1.2rem;
          margin: 0 0 20px 0;
          opacity: 0.9;
        }

        .info-toggle {
          margin-bottom: 20px;
        }

        .info-button {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .info-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .info-panel {
          position: absolute;
          top: 120px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 15px;
          padding: 20px;
          max-width: 500px;
          width: 90%;
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: slideDown 0.5s ease-out;
        }

        .info-panel h3 {
          margin: 0 0 15px 0;
          color: #fff;
          font-size: 1.3rem;
        }

        .info-panel ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-panel li {
          padding: 8px 0;
          font-size: 1rem;
          opacity: 0.9;
        }

        .demo-controls {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .restart-button {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          font-weight: 600;
        }

        .restart-button:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .demo-header h1 {
            font-size: 2.2rem;
          }
          
          .demo-header p {
            font-size: 1rem;
            padding: 0 10px;
          }

          .info-panel {
            top: 100px;
            padding: 15px;
          }

          .info-panel h3 {
            font-size: 1.1rem;
          }

          .info-panel li {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedLogoDemo;
