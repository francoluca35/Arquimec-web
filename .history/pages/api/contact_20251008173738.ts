import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido. Use POST para enviar correos.' });
  }

  try {
    // Para simplificar, vamos a manejar solo texto por ahora
    // Los archivos se pueden agregar en una versión futura
    const { nombre, apellido, empresa, email, telefono, mensaje } = req.body;

    // Validación de datos
    if (!nombre || !apellido || !empresa || !email || !mensaje) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'El email no es válido'
      });
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'deamoncompany18@gmail.com',
        pass: process.env.EMAIL_PASS || 'qqpjocekljsjgwvf',
      },
      timeout: 15000, // 15 segundos de timeout
    } as any);

    // Preparar opciones del correo
    const mailOptions: any = {
      from: process.env.EMAIL_USER || 'deamoncompany18@gmail.com',
      replyTo: email,
      to: process.env.CONTACT_EMAIL || 'contacto@arquimec.com',
      subject: `Nuevo mensaje de ${nombre} ${apellido} - ${empresa} | Arquimec`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a2a3c; font-size: 24px; margin: 0; font-weight: 300; letter-spacing: 2px;">ARQUIMEC</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Arquitectura y Diseño</p>
          </div>
          
          <h2 style="color: #1a2a3c; border-bottom: 2px solid #b48f42; padding-bottom: 10px; font-weight: 400;">Nuevo Mensaje de Contacto</h2>
          
          <div style="margin: 20px 0; background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #b48f42;">
            <p style="margin: 10px 0; color: #333;"><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p style="margin: 10px 0; color: #333;"><strong>Organización:</strong> ${empresa}</p>
            <p style="margin: 10px 0; color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #b48f42; text-decoration: none;">${email}</a></p>
            ${telefono ? `<p style="margin: 10px 0; color: #333;"><strong>Teléfono:</strong> ${telefono}</p>` : ''}
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; color: #333; font-weight: 500;"><strong>Mensaje:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #555; line-height: 1.6;">${mensaje}</p>
          </div>
          
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
            <p>Este mensaje fue enviado desde el formulario de contacto de <a href="https://www.arquimec.com" style="color: #b48f42;">www.arquimec.com</a></p>
            <p style="margin-top: 10px;">
              <strong>Arquimec</strong> - Arquitectura y Diseño<br>
              Buenos Aires, Argentina<br>
              +54 11 3119-9882
            </p>
          </div>
        </div>
      `,
      text: `
Nuevo Mensaje de Contacto - Arquimec

Nombre: ${nombre} ${apellido}
Organización: ${empresa}
Email: ${email}
${telefono ? `Teléfono: ${telefono}` : ''}

Mensaje:
${mensaje}


---
Este mensaje fue enviado desde el formulario de contacto de www.arquimec.com

Arquimec - Arquitectura y Diseño
Buenos Aires, Argentina
+54 11 3119-9882
      `,
    };


    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: 'Correo enviado exitosamente'
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    
    // Manejar errores específicos de formidable
    if (error instanceof Error && error.message.includes('maxFileSize exceeded')) {
      return res.status(400).json({
        message: 'El archivo es demasiado grande. El límite es de 5MB.'
      });
    }
    
    if (error instanceof Error && error.message.includes('invalid file type')) {
      return res.status(400).json({
        message: 'Tipo de archivo no permitido. Solo se aceptan PDF e imágenes.'
      });
    }
    
    return res.status(500).json({
      message: 'Error al enviar el correo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}
