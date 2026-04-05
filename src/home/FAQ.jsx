import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";

const FAQ = [
  {
    question: "How does Toletforrent verify listings?",
    answer: "Every property undergoes a rigorous 12-point manual verification process. Our team checks ownership documents and performs physical site visits to ensure the listing is 100% authentic before it goes live."
  },
  {
    question: "Is there a fee to chat with property owners?",
    answer: "No. Our 'Owner-Direct Network' allows you to skip the middleman and chat directly with landlords at no cost. We believe in transparent, direct communication."
  },
  {
    question: "How do 'Real-time alerts' work?",
    answer: "Once you set your preferences in the app, our system sends an instant notification to your phone the second a matching property is listed. You'll never miss a 'Hot Property' again."
  },
  {
    question: "Can I schedule a property tour through the app?",
    answer: "Absolutely. You can view available time slots and book a tour directly within the app interface. Both you and the owner will receive a confirmation alert immediately."
  }
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left transition-all hover:text-red-600"
      >
        <span className="text-lg font-bold text-slate-900">{question}</span>
        <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <HiMinus className="text-red-600" /> : <HiPlus className="text-slate-400" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed italic border-l-2 border-green-500 pl-4 ml-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ToletFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-10 px-6 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          frequently asked  <span className="text-red-400 cursor-pointer">Questions</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-green-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-500 font-medium">
            Everything you need to know about the Toletforrent experience.
          </p>
        </motion.div>

        <div className="space-y-2">
          {FAQ.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center"
        >
          <p className="text-slate-600 font-medium">Still have questions?</p>
          <button className="mt-4 text-red-600 font-bold hover:underline decoration-green-500 underline-offset-4">
            Contact our 24/7 Support Team
          </button>
        </motion.div>
      </div>
    </section>
    
  );
}