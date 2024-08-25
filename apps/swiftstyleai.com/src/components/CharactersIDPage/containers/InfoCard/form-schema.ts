import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters long.' })
    .max(60, {
      message: 'Description must be no more than 60 characters long.',
    }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long.' })
    .max(160, {
      message: 'Description must be no more than 160 characters long.',
    }),
});

export default formSchema;
