import { z } from 'zod';

export interface UserTokenInfoDTO {
  id: string;
  name: string | null;
  email: string;
}

export const UserAuthRequestModel = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
});

export type UserAuthRequestModelDTO = z.infer<typeof UserAuthRequestModel>;
