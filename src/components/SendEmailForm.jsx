import { useState } from 'react';

const SendEmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const BASE_URL = "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(`${BASE_URL}/send-test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('✅ Email sent successfully!');
      } else {
        setStatus('❌ Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('❌ Error occurred while sending.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem' }}>
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={formData.to}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit">Send Email</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default SendEmailForm;
