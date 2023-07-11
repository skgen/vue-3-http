import { z } from 'zod';

export const entitySchema = <T extends z.AnyZodObject>
  (schema: T) => z.object({
    id: z.string(),
  }).merge(schema);

export const collectionSchema = <T extends z.ZodTypeAny>
  (dataSchema: T) => z.object({
    data: z.array(dataSchema),
    count: z.number(),
    page: z.number(),
    total: z.number(),
    lastPage: z.number(),
  });

export const rawCollectionSchema = <T extends z.ZodTypeAny>
  (dataSchema: T) => z.object({
    data: z.array(dataSchema),
    total: z.number(),
  });
