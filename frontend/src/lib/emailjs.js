import emailjs from '@emailjs/browser'

// Values come from frontend/.env (see .env.example). The EmailJS public key is
// designed to be used in the browser; never put your private key here.
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export const isEmailConfigured = Boolean(config.serviceId && config.templateId && config.publicKey)

/**
 * Sends the contact form through EmailJS.
 * Template variables available in your EmailJS template:
 * {{name}}, {{email}}, {{subject}}, {{message}}, {{time}}
 */
export async function sendContactEmail({ name, email, subject, message }) {
  if (!isEmailConfigured) {
    throw new Error('The contact form is not configured yet. Please email me directly instead.')
  }
  return emailjs.send(
    config.serviceId,
    config.templateId,
    { name, email, subject, message, reply_to: email, time: new Date().toLocaleString() },
    { publicKey: config.publicKey },
  )
}
