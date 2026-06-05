import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { CreateContactInput } from '../schemas/index.js';

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body as CreateContactInput;
  const message = await prisma.contactMessage.create({ data });
  return ok(res, { id: message.id }, undefined, 201);
});
