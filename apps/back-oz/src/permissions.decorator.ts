import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]) => {
  //setting permissions
  return SetMetadata('permissions', permissions);
};
