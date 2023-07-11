import { z } from 'zod';

const hydraViewSchema = z.object({
  '@id': z.string(),
  '@type': z.string(),
  'hydra:first': z.string().optional(),
  'hydra:last': z.string().optional(),
  'hydra:next': z.string().optional(),
});

export const hydraEntitySchema = <T extends z.AnyZodObject>
  (entitySchema: T) => z.object({
    '@id': z.string(),
    '@type': z.string(),
  }).merge(entitySchema);

export const hydraCollectionSchema = <T extends z.ZodTypeAny>
  (entitySchema: T) => z.object({
    '@id': z.string(),
    '@type': z.string(),
    'hydra:member': z.array(entitySchema),
    'hydra:totalItems': z.number(),
    'hydra:view': hydraViewSchema.optional(),
  });
