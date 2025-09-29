import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, companyContext } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.log('OpenAI API key not found, using fallback response');
    return res.status(200).json({ 
      response: 'Entiendo tu consulta, pero para darte la mejor respuesta posible, te recomiendo contactar directamente con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp.'
    });
  }

  try {
    // Prepare conversation history for context
    const conversationHistory = history.map((msg: any) => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));

    // Create the prompt with company context
    const systemPrompt = `Eres un asistente virtual especializado de Arquimec, un estudio de arquitectura argentino. 

INFORMACIÓN DE LA EMPRESA:
${companyContext}

INSTRUCCIONES:
1. Responde siempre en español argentino, de manera amigable y profesional
2. Si la consulta es sobre servicios básicos (arquitectura residencial, comercial, diseño de interiores, consultorías), da información específica
3. Si la consulta es compleja o técnica, ofrece conectar con un especialista
4. Siempre menciona que pueden contactar por WhatsApp al +54 11 1234-5678 para consultas más específicas
5. Mantén las respuestas concisas pero informativas
6. Si no sabes algo específico, admítelo y ofrece contactar con un especialista

RESPUESTA:`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return res.status(500).json({ 
      error: 'Error processing request',
      response: 'Lo siento, hay un problema técnico. Por favor, contacta directamente con nuestros especialistas al +54 11 1234-5678 o por WhatsApp.'
    });
  }
}
