import React, { useState } from 'react';

const FeedbackForm = () => {
  const [form, setForm] = useState({ story: '', prize: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/raffle-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="px-5 py-3 max-w-md mx-auto">
      <h1 className="font-serif text-2xl mb-4">We’d love your feedback!</h1>
      {submitted ? (
        <p className="text-green-600">Thanks for your input!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="story"
            placeholder="My favourite bedtime story is…"
            value={form.story}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            required
          />
          <input
            name="prize"
            placeholder="Suggest a prize you’d love to win"
            value={form.prize}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            required
          />
          <button type="submit" className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
