'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      process.env.VITE_EMAILJS_SERVICE_ID;
    const ownerTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OWNER_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_OWNER_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_ID;
    const userTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_USER_ID;
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      process.env.VITE_EMAILJS_PUBLIC_KEY;

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
      // Common parameter variations to match your EmailJS templates:
      user_name: formData.name,
      user_email: formData.email,
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      to_name: 'M M Sabit',
      sent_at: new Date().toLocaleString(),
    };

    try {
      // 1. Send email notification to you (portfolio owner)
      const emailRequests = [
        emailjs.send(serviceId, ownerTemplateId, templateParams, publicKey),
      ];

      // 2. Send confirmation copy to the user who filled the form
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
    } catch (err: unknown) {
      console.error('Email send failed:', err);
      const errObj = err as { text?: string; message?: string };
      setErrorMessage(
        errObj?.text ||
          errObj?.message ||
          'Failed to send message. Please try again later or reach out directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader bgTitle="Contact" frontTitle="Contact Me" />

        <div className="max-w-3xl mx-auto">
          {/* Success Message Alert */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-primary text-primary-hover text-center font-medium shadow-sm transition-all flex items-center justify-center gap-2">
              <i className="fa fa-check-circle text-lg"></i>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-600 text-center font-medium shadow-sm transition-all flex items-center justify-center gap-2">
              <i className="fa fa-exclamation-circle text-lg"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5 text-center">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="text-left">
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 rounded-[25px] border ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-primary text-gray-700 bg-white shadow-sm transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 ml-4 font-medium">{errors.name}</p>
                )}
              </div>

              <div className="text-left">
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 rounded-[25px] border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-primary text-gray-700 bg-white shadow-sm transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 ml-4 font-medium">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="text-left">
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-[25px] border ${
                  errors.subject ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-primary text-gray-700 bg-white shadow-sm transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1.5 ml-4 font-medium">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="text-left">
              <textarea
                id="message"
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-[25px] border ${
                  errors.message ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-primary text-gray-700 bg-white shadow-sm transition-all placeholder:text-gray-400 resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1.5 ml-4 font-medium">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-sm font-semibold transition-all duration-300 text-base shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-current"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
