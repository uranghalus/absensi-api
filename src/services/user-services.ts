import { createHash } from 'node:crypto';
import { db } from '../utils/db';
import { hashPassword } from '../utils/password-utils';
function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}
async function createUserByEmailAndPassword(user: any) {
  const emailHash = createHash('md5').update(user.email).digest('hex');
  const profileImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
  const { hash, salt } = await hashPassword(user.password);
  return db.user.create({
    data: {
      name: user.name,
      email: user.email,
      salt: salt,
      hash: hash,
      profileImage: profileImage,
      isOnline: false,
    },
  });
}

function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}
export { findUserByEmail, createUserByEmailAndPassword, findUserById };
