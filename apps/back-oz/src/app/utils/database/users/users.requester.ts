import { getConnector } from '../ConnectDboz';
import { IUserEntity } from './users.entity';

export const getUser = async (username: string): Promise<IUserEntity> => {
  const connector = getConnector();
  const users = await connector
    .select()
    .from<IUserEntity>('users')
    .where('username', username);

  return users[0];
};
