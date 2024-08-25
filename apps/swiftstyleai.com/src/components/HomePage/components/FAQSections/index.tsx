import Section from '@/components/ui/section';
import { Typography } from '@/components/ui/typography';

import FAQItem from './FAQItem';

const faqData = [
  {
    question: 'How does it work?',
    answer:
      'Once you install our Chrome extension, every time you try to reply, a SwiftStyle AI button will appear. Simply click on it, and SwiftStyle AI will generate a reply tailored to your style.',
  },
  {
    question: 'What if I have more questions?',
    answer:
      "If you have any additional questions that aren't covered in this FAQ, please contact our support team. You can reach us via email at namvhoang02@gmail.com.",
  },
];

export default function FAQSections() {
  return (
    <Section id='faq' className='py-10 lg:pt-20'>
      <div className='grid md:grid-cols-5 gap-10'>
        <div className='md:col-span-2'>
          <div className='max-w-xs'>
            <Typography variant='h2'>
              Frequently
              <br />
              asked questions
            </Typography>

            <p className='mt-1 hidden md:block text-gray-600 dark:text-neutral-400'>
              Answers to the most frequently asked questions.
            </p>
          </div>
        </div>
        <div className='md:col-span-3'>
          <div className='hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700'>
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpenByDefault={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
