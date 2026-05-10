import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from 'react-icons/fi';
import { saveMessages, getMessages } from './AdminPanel';
import './Contact.css';

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: 'dev@example.com', color: '#6c63ff' },
  { icon: <FiPhone />, label: 'Telefon', value: '+998 90 123 45 67', color: '#00d4aa' },
  { icon: <FiMapPin />, label: 'Manzil', value: 'O\'zbekiston, Toshkent', color: '#ff6b9d' },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending delay
    setTimeout(() => {
      // Save message to localStorage for admin panel
      const now = new Date();
      const newMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleString('uz-UZ'),
        read: false,
        createdAt: now.getTime(),
      };

      const existingMessages = getMessages();
      saveMessages([newMessage, ...existingMessages]);

      // Notify admin panel
      window.dispatchEvent(new Event('messages-updated'));

      setSubmitted(true);
      setSending(false);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <div className={`contact__header ${inView ? 'contact__header--visible' : ''}`}>
          <h2 className="section-title">Aloqa</h2>
          <p className="section-subtitle">
            Loyihangiz bo'yicha bog'laning — birga ajoyib narsalar yaratamiz!
          </p>
        </div>

        <div className="contact__grid">
          <div className={`contact__info ${inView ? 'contact__info--visible' : ''}`}>
            <h3 className="contact__info-title">Bog'lanish</h3>
            <p className="contact__info-text">
              Istalgan savollaringiz yoki loyiha takliflaringiz bo'lsa, men bilan bog'laning. 
              Tez orada javob berishga harakat qilaman!
            </p>

            <div className="contact__info-items">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact__info-item">
                  <div className="contact__info-icon" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__social-proof">
              <div className="contact__social-proof-avatars">
                <span>👤</span>
                <span>👩‍💻</span>
                <span>👨‍💼</span>
              </div>
              <p>
                <strong>30+</strong> mamnun mijozlar bilan hamkorlik qildim
              </p>
            </div>
          </div>

          <div className={`contact__form-wrapper ${inView ? 'contact__form-wrapper--visible' : ''}`}>
            <form className="contact__form glass-card" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="name">Ism</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ismingizni kiriting"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email manzilingiz"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="subject">Mavzu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Xabaringiz mavzusi"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message">Xabar</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Xabaringizni yozing..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact__submit btn-primary" disabled={submitted || sending}>
                {sending ? (
                  <span className="contact__sending">
                    <span className="contact__spinner" /> Yuborilmoqda...
                  </span>
                ) : submitted ? (
                  <><FiCheck /> Yuborildi!</>
                ) : (
                  <>
                    <FiSend />
                    Xabar yuborish
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
