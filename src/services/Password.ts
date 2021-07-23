import bcrypt from "bcrypt"

export class Password{

  static async hashPassword(plainPassword:string, saltRounds:number){
    const hashedPassword = await bcrypt.hash(plainPassword,saltRounds)
    return hashedPassword;
  }

  static async checkPassword(plainPassword:string, hashedPassword:string){
    const result= await bcrypt.compare(plainPassword,hashedPassword);
    return result;
  }

}