import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Send, CheckCircle } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";

interface ContactProps {
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={28} />,
      label: "Email",
      value: "abeeshsengottuvel12@gmail.com",
      href: SOCIAL_LINKS.email,
    },
    {
      icon: <Phone size={28} />,
      label: "Phone",
      value: "+91 9047722626",
      href: SOCIAL_LINKS.phone,
    },
    {
      icon: <MapPin size={28} />,
      label: "Location",
      value: "Chennai, India",
    },
    {
      icon: <Linkedin size={28} />,
      label: "LinkedIn",
      value: "Abeesh S.",
      href: SOCIAL_LINKS.linkedin,
    },
    {
      icon: <Github size={28} />,
      label: "GitHub",
      value: "AbeeshSengottuvel",
      href: SOCIAL_LINKS.github,
    },
    {
      icon: <Instagram size={28} />,
      label: "Instagram",
      value: "@abeesh",
      href: SOCIAL_LINKS.instagram,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate sending message API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`p-6 sm:p-10 md:p-16 lg:p-20 rounded-[3.5rem] md:rounded-[5rem] border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden max-w-full ${
          isDarkMode
            ? "bg-[#1a1c22]/60 border-white/5"
            : "bg-white border-black/5"
        }`}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-20 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none mb-6">
              Get In Touch
            </h2>
            <p
              className={`text-xl md:text-2xl font-medium max-w-2xl leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Ready to elevate your software quality? Let&apos;s discuss how I can contribute to your engineering team&apos;s success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Details Grid (Column 1) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 sm:gap-5">
                  {item.href ? (
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.15,
                        rotate: 10,
                        backgroundColor: "rgba(37, 99, 235, 0.2)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0 cursor-pointer transition-colors"
                    >
                      {item.icon}
                    </motion.a>
                  ) : (
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                      {item.icon}
                    </div>
                  )}

                  <div className="flex flex-col min-w-0 pt-1">
                    <p className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-400 mb-1 truncate">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-base md:text-lg font-black break-words transition-colors ${
                          isDarkMode
                            ? "text-white hover:text-blue-400"
                            : "text-slate-900 hover:text-blue-600"
                        }`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        className={`text-base md:text-lg font-black break-words ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Email Form (Column 2) */}
            <div className="lg:col-span-7">
              <div
                className={`p-8 md:p-10 rounded-[2.5rem] border ${
                  isDarkMode
                    ? "bg-[#111317] border-white/5"
                    : "bg-slate-50 border-black/5"
                }`}
              >
                <h3 className="text-xl font-bold font-display mb-6">Send Me a Message</h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`px-4 py-3 rounded-xl border text-sm font-bold w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                        isDarkMode
                          ? "bg-slate-800 border-white/10 text-white focus:border-blue-500"
                          : "bg-white border-black/10 text-slate-950 focus:border-blue-600"
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-xs font-bold text-red-500">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className={`px-4 py-3 rounded-xl border text-sm font-bold w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                        isDarkMode
                          ? "bg-slate-800 border-white/10 text-white focus:border-blue-500"
                          : "bg-white border-black/10 text-slate-950 focus:border-blue-600"
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-xs font-bold text-red-500">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Hi Abeesh, I'd like to discuss a project..."
                      className={`px-4 py-3 rounded-xl border text-sm font-bold w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                        isDarkMode
                          ? "bg-slate-800 border-white/10 text-white focus:border-blue-500"
                          : "bg-white border-black/10 text-slate-950 focus:border-blue-600"
                      }`}
                    />
                    {formErrors.message && (
                      <span className="text-xs font-bold text-red-500">{formErrors.message}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] flex items-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send size={14} className={isSubmitting ? "animate-pulse" : ""} />
                    </button>

                    <AnimatePresence>
                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex items-center gap-2 text-green-500 font-bold text-sm"
                        >
                          <CheckCircle size={16} /> Message sent successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
