import { compare } from 'bcryptjs';
import {getRepository} from 'typeorm';
import {sign} from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password}: Request): Promise<Response>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: {email}});

    if (!user){
      throw new Error( 'Incorrect email.');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched){
      throw new Error( 'Incorrect password.');
    }

    const token = sign({},'d2eeb1229fbd633d1d55b2f6f9a08fad',{
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
