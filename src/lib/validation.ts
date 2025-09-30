import { z } from 'zod';

// Common helpers
export const uuid = z.string().uuid();

const priceSchema = z.preprocess((v: unknown) => {
  if (typeof v === 'string') return Number(v);
  return v;
}, z.number().finite().nonnegative());

// menu_items schemas
export const MenuItemCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  price: priceSchema,
  category: z.enum(['coffee', 'pastry']),
});

export const MenuItemUpdateSchema = MenuItemCreateSchema.partial().extend({
  id: uuid,
});

// testimonials schemas
export const TestimonialCreateSchema = z.object({
  name: z.string().min(1),
  image_url: z.string().url().optional().or(z.literal('')).optional().nullable(),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(1),
});

export const TestimonialUpdateSchema = TestimonialCreateSchema.partial().extend({
  id: uuid,
});

export const AllowedTables = ['menu_items', 'testimonials'] as const;
export type AllowedTable = typeof AllowedTables[number];

export function getCreateSchema(table: AllowedTable) {
  switch (table) {
    case 'menu_items':
      return MenuItemCreateSchema;
    case 'testimonials':
      return TestimonialCreateSchema;
    default:
      // Should never happen due to typing, but keep a runtime guard
      throw new Error('Unsupported table');
  }
}

export function getUpdateSchema(table: AllowedTable) {
  switch (table) {
    case 'menu_items':
      return MenuItemUpdateSchema;
    case 'testimonials':
      return TestimonialUpdateSchema;
    default:
      throw new Error('Unsupported table');
  }
}

export function validateIdParam(id: string | null) {
  if (!id) return { ok: false, error: 'Missing id' } as const;
  const parsed = uuid.safeParse(id);
  if (!parsed.success) return { ok: false, error: 'Invalid id' } as const;
  return { ok: true, id: parsed.data } as const;
}
