import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserAuth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(UserAuth)
    private readonly userAuthRepository: Repository<UserAuth>,
  ) {}
  async signUp({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.usersRepository.create({
        name,
      });
      await this.usersRepository.save(newUser);
      const newUserAuth = await this.userAuthRepository.create({
        userId: newUser.id,
        email,
        password: hashedPassword,
      });
      await this.userAuthRepository.save(newUserAuth);
    } catch (error) {
      if (error instanceof Error) {
        console.log({ message: error.message });
        console.log({ name: error.name });
      }
    }
  }

  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const user = await this.userAuthRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = jwt.sign({ userId: user.userId }, 'secret-key', {
      expiresIn: 1800,
    });

    return { accessToken };
  }

  async signOut({ userId }: { userId: string }) {}

  async me({ userId }: { userId: string }) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userName: user.name };
  }
}
