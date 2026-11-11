'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiAlertCircle, FiCheckCircle, FiEdit3, FiMail, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi';
import { FloatingTechIcons } from './FloatingTechIcons';
import { SectionHeader } from './SectionHeader';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData((previous) => ({ ...previous, [id]: value }));

    if (errors[id]) {
      setErrors((previous) => {
        const copy = { ...previous };
        delete copy[id];
        return copy;
      });
    }

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
    const ownerTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OWNER_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_OWNER_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_ID;
    const userTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER_ID || process.env.VITE_EMAILJS_TEMPLATE_USER_ID;
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !ownerTemplateId || !publicKey) {
      setErrorMessage(
        'Email service is not configured yet. Please set your EmailJS credentials in the .env file.'
      );
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      user_name: formData.name,
      user_email: formData.email,
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      to_name: 'M M Sabit',
      sent_at: new Date().toLocaleString(),
    };

    try {
      const emailRequests = [
        emailjs.send(serviceId, ownerTemplateId, templateParams, publicKey),
      ];

      if (userTemplateId) {
        emailRequests.push(
          emailjs.send(serviceId, userTemplateId, templateParams, publicKey)
        );
      }

      await Promise.all(emailRequests);

      setSuccessMessage(
        userTemplateId
          ? 'Thank you! Your message has been sent successfully. A confirmation copy has also been emailed to you.'
          : 'Thank you! Your message has been sent successfully.'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSuccessMessage(null);
      }, 7000);
    } catch (sendError: unknown) {
      console.error('Email send failed:', sendError);
      const errorObject = sendError as { text?: string; message?: string };
      setErrorMessage(
        errorObject?.text ||
          errorObject?.message ||
          'Failed to send message. Please try again later or reach out directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `field w-full rounded-2xl border bg-gray-50/60 py-3.5 pl-12 pr-5 text-sm text-dark placeholder:text-secondary/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
      errors[field] ? 'border-red-400' : 'border-gray-200/90'
    }`;

  return (
    <section id="contact" className="relative overflow-hidden bg-[#f8faff] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[min(80vw,700px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />

      <FloatingTechIcons preset="contact" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Contact" frontTitle="Contact Me" />

        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] bg-gradient-to-br from-primary/40 via-white to-primary-hover/30 p-px shadow-[0_40px_90px_-50px_rgba(10,18,41,0.5)]">
            <div className="rounded-[calc(2rem-1px)] bg-white/95 p-5 backdrop-blur-xl sm:p-8 md:p-10">
              {successMessage && (
                <div
                  role="status"
                  className="animate-face-in mb-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-primary-hover"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-primary" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="animate-face-in mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600"
                >
                  <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <div className="relative">
                      <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-primary/70" />
                      <input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.name)}
                        className={inputClass('name')}
                      />
                    </div>
                    {errors.name && (
                      <p className="ml-2 mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-primary/70" />
                      <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.email)}
                        className={inputClass('email')}
                      />
                    </div>
                    {errors.email && (
                      <p className="ml-2 mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <FiEdit3 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-primary/70" />
                    <input
                      type="text"
                      id="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.subject)}
                      className={inputClass('subject')}
                    />
                  </div>
                  {errors.subject && (
                    <p className="ml-2 mt-1.5 text-xs font-medium text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <FiMessageSquare className="pointer-events-none absolute left-4 top-5 text-lg text-primary/70" />
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.message)}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>
                  {errors.message && (
                    <p className="ml-2 mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shine group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(37,99,235,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiSend className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
