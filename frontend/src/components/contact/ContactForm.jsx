import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { sendContactEmail } from '../../lib/emailjs.js'
import Button from '../ui/Button.jsx'

const initialValues = { name: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.'
  return errors
}

function Field({ id, label, error, as: Tag = 'input', ...props }) {
  return (
    <div className={Tag === 'textarea' ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-[0.95rem] text-ink transition-colors placeholder:text-zinc-400 focus:border-accent focus:ring-3 focus:ring-accent/15 focus:outline-none ${
          error ? 'border-rose-400' : 'border-line hover:border-zinc-300'
        } ${Tag === 'textarea' ? 'min-h-36 resize-y' : ''}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus('sending')
    try {
      await sendContactEmail(values)
      setStatus('success')
      setValues(initialValues)
    } catch (error) {
      setErrorMessage(error?.message || error?.text || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="name" placeholder="Your name" />
        <Field id="email" label="Email" type="email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" placeholder="you@example.com" />
        <div className="sm:col-span-2">
          <Field id="subject" label="Subject" value={values.subject} onChange={handleChange} error={errors.subject} placeholder="What's this about?" />
        </div>
        <Field id="message" label="Message" as="textarea" value={values.message} onChange={handleChange} error={errors.message} placeholder="Write your message…" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="accent" disabled={sending} className="w-full sm:w-auto">
          {sending ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          {sending ? 'Sending…' : 'Send Me an Email'}
        </Button>

        <div aria-live="polite" className="text-sm">
          {status === 'success' && (
            <p className="flex items-center gap-2 text-emerald-700">
              <CircleCheck size={16} aria-hidden="true" />
              Thanks! Your message has been sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-2 text-rose-600">
              <CircleAlert size={16} className="shrink-0" aria-hidden="true" />
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
