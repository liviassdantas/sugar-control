import * as bcrypt from 'bcrypt';

export class ValidateSecurity {
  public static async generateHash(
    password: string,
    salts: number,
  ): Promise<string> {
    return await bcrypt.hash(password, salts);
  }

  public static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash.toString());
  }
}
