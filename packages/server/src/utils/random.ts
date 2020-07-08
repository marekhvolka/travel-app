import { randomBytes } from 'crypto'

export const generateId = () => randomBytes(12).toString('hex');
