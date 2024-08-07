import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { LoginDto, RegisterDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from './helpers/password';


@Injectable()
export class AuthentificationService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private jwtService: JwtService
    ) { }
 
    async register(registerDto: RegisterDto): Promise<User> {
        try {
            const { password } = registerDto
            const hash = await hashPassword(password)
            const createdUser = new this.UserModel({ ...registerDto, password: hash });
            return createdUser.save();
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    
    async login(loginDto: LoginDto) : Promise<any>{
        try {
            const { password, username } = loginDto
            const findUser = await this.UserModel.findOne({ username })
            if (!findUser) throw new UnauthorizedException('Incorrect username or password')
 
            const match = await bcrypt.compare(password, findUser.password);
            if (!match) throw new UnauthorizedException('Incorrect username or password')

            const payload = { username, userId: findUser._id }
            const token = await this.jwtService.signAsync(payload)
            return await this.UserModel.findOneAndUpdate({ username }, { token }, { returnDocument: 'after'})

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
  