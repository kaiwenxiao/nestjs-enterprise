import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, oldPassword: string) {
  return bcrypt.compareSync(password, oldPassword);
}
