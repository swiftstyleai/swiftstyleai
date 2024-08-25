import { z } from 'zod';

const nameMin = 5;
const nameMax = 60;

const descriptionMin = 5;
const descriptionMax = 160;

const formSchema = z.object({
  name: z
    .string()
    .min(nameMin, {
      message: `Name must be at least ${nameMin} characters long.`,
    })
    .max(nameMax, {
      message: `Name must be no more than ${nameMax} characters long.`,
    }),
  description: z
    .string()
    .min(descriptionMin, {
      message: `Description must be at least ${descriptionMin} characters long.`,
    })
    .max(descriptionMax, {
      message: `Description must be no more than ${descriptionMax} characters long.`,
    }),
});

export default formSchema;
