import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userInfo } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    // Generate PDF
    const pdfBuffer = await generateChatPDF(messages, userInfo);
    
    // Send email with PDF
    await sendEmailWithPDF(pdfBuffer, messages, userInfo);

    return res.status(200).json({ 
      success: true, 
      message: 'PDF generado y enviado por email correctamente' 
    });

  } catch (error) {
    console.error('Error generating or sending PDF:', error);
    return res.status(500).json({ 
      error: 'Error al generar o enviar el PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function generateChatPDF(messages: any[], userInfo: any) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Generate HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Resumen de Chat - Arquimec</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #007bff;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 10px;
        }
        .chat-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .message {
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 8px;
        }
        .user-message {
          background-color: #e3f2fd;
          margin-left: 50px;
          border-left: 4px solid #2196f3;
        }
        .bot-message {
          background-color: #f5f5f5;
          margin-right: 50px;
          border-left: 4px solid #4caf50;
        }
        .message-header {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .user-message .message-header {
          color: #1976d2;
        }
        .bot-message .message-header {
          color: #388e3c;
        }
        .timestamp {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🏗️ ARQUIMEC</div>
        <h1>Resumen de Conversación</h1>
        <p>Estudio de Arquitectura - Chat Inteligente</p>
      </div>

      <div class="chat-info">
        <h3>📋 Información de la Conversación</h3>
        <p><strong>Cliente:</strong> ${userInfo?.name || 'No especificado'}</p>
        <p><strong>Email:</strong> ${userInfo?.email || 'No especificado'}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-AR')}</p>
        <p><strong>Hora:</strong> ${new Date().toLocaleTimeString('es-AR')}</p>
        <p><strong>Total de mensajes:</strong> ${messages.length}</p>
      </div>

      <h3>💬 Conversación</h3>
      
      ${messages.map((message, index) => `
        <div class="message ${message.isUser ? 'user-message' : 'bot-message'}">
          <div class="message-header">
            ${message.isUser ? '👤 Cliente' : '🤖 ARQ-BOT'}
          </div>
          <div>${message.text}</div>
          <div class="timestamp">
            ${new Date(message.timestamp).toLocaleString('es-AR')}
          </div>
        </div>
      `).join('')}

      <div class="footer">
        <p>Este documento fue generado automáticamente por el sistema de chat de Arquimec</p>
        <p>📧 info@arquimec.com | 📞 +54 11 1234-5678</p>
        <p>🏢 Buenos Aires y Córdoba, Argentina</p>
      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });

  await browser.close();
  return pdfBuffer;
}

async function sendEmailWithPDF(pdfBuffer: Buffer, messages: any[], userInfo: any) {
  // Create transporter (you'll need to configure this with your email service)
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Francolucap1@gmail.com',
    subject: `📋 Resumen de Chat - Arquimec - ${userInfo?.name || 'Cliente'}`,
    html: `
      <h2>🏗️ Resumen de Conversación - Arquimec</h2>
      <p><strong>Cliente:</strong> ${userInfo?.name || 'No especificado'}</p>
      <p><strong>Email:</strong> ${userInfo?.email || 'No especificado'}</p>
      <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-AR')}</p>
      <p><strong>Total de mensajes:</strong> ${messages.length}</p>
      
      <h3>💬 Resumen de la conversación:</h3>
      <ul>
        ${messages.slice(-5).map(msg => `
          <li><strong>${msg.isUser ? 'Cliente' : 'ARQ-BOT'}:</strong> ${msg.text}</li>
        `).join('')}
      </ul>
      
      <p>El PDF completo con toda la conversación está adjunto a este email.</p>
    `,
    attachments: [
      {
        filename: `chat-arquimec-${new Date().toISOString().split('T')[0]}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}
