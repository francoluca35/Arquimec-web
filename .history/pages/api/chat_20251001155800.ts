import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history, userInfo } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check if Gemini API key is available
  console.log('Checking Gemini API key:', process.env.GEMINI_API_KEY ? 'Found' : 'Not found');
  if (!process.env.GEMINI_API_KEY) {
    console.log('Gemini API key not found, using fallback response');
    return res.status(200).json({ 
      response: 'Entiendo tu consulta, pero para darte la mejor respuesta posible, te recomiendo contactar directamente con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp.'
    });
  }

  try {
    // Prepare conversation history for context
    const conversationHistory = history?.map((msg: any) => ({
      role: msg.isUser ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })) || [];

    // Contexto específico de Arquimec
    const companyContext = `
INFORMACIÓN DE ARQUIMEC:
- Estudio de arquitectura argentino fundado en 2010
- Especializado en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos
- Director: Arq. Marcelo Eduardo González Silva
- Ubicación: Buenos Aires y Córdoba, Argentina
- Más de 7,000 m² construidos
- Más de 2,000 clientes satisfechos
- Horarios de atención: Lunes a Viernes 8:00-19:00, Sábado 9:00-16:00
- Contacto: +54 11 1234-5678, info@arquimec.com

SERVICIOS PRINCIPALES:
1. Arquitectura Residencial: Diseño de viviendas unifamiliares y complejos residenciales
2. Arquitectura Comercial: Espacios de trabajo, retail y corporativos
3. Diseño de Interiores: Transformación de espacios con ambientes únicos
4. Consultorías Técnicas: Asesoramiento en normativas, permisos y reglamentaciones
5. Construcción: Ejecución completa de proyectos arquitectónicos

ENFOQUE: Creatividad, calidad, precisión, sostenibilidad, funcionalidad y atención al detalle
`;

    // Create the system instruction
    const systemInstruction = `Eres ARQ-BOT, el asistente virtual inteligente de Arquimec. Tu personalidad es:
- Profesional pero amigable
- Conocedor de arquitectura y construcción
- Proactivo en ofrecer soluciones
- Siempre enfocado en ayudar al cliente

INSTRUCCIONES ESPECÍFICAS:
1. Responde SIEMPRE en español argentino, de manera natural y conversacional
2. Usa tu conocimiento de arquitectura para dar respuestas técnicas cuando sea apropiado
3. Para consultas complejas, ofrece conectar con especialistas
4. Siempre menciona opciones de contacto (teléfono, WhatsApp, email)
5. Mantén respuestas concisas pero informativas (máximo 200 palabras)
6. Si no sabes algo específico, admítelo y ofrece contactar con un especialista
7. Usa emojis ocasionalmente para ser más amigable
8. Pregunta por detalles del proyecto cuando sea relevante
9. Ofrece servicios específicos según la consulta del cliente

${companyContext}`;

    const contents = [
      {
        role: 'user',
        parts: [{
          text: `${systemInstruction}\n\nUsuario: ${userInfo?.name ? `${userInfo.name} (${userInfo.email})` : 'Cliente'} dice: "${message}"`
        }]
      }
    ];

    // Add conversation history if available
    if (conversationHistory.length > 0) {
      contents.unshift(...conversationHistory.slice(-6)); // Keep last 6 messages for context
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
          responseMimeType: "text/plain"
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Error calling Gemini:', error);
    return res.status(200).json({ 
      response: 'Entiendo tu consulta, pero para darte la mejor respuesta posible, te recomiendo contactar directamente con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp. 😊'
    });
  }
}
