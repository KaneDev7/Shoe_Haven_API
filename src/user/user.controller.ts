import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/user.dto';
import { Response } from 'express';
import { serverErrorFactory } from './errors/serverErrors';
import { successResponse } from './success/successResponse';


@Controller('api/users')
export class UserController {
    constructor(readonly userService: UserService) { }

    @Post('/auth')
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response ) {
        try {
            await this.userService.create(createUserDto)
            res.status(201).json({ status: 'success', message: 'user created' })
        } catch (error) {
            console.log(error)
            const serverErrorObject = serverErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }

    @Get()
    async findAll(@Res() res: Response ) {
        try {
            const users = await this.userService.findAll()
            const responseObject = successResponse(users)
            res.status(HttpStatus.OK).json(responseObject)

        } catch (error) {
            console.log(error)
            const serverErrorObject = serverErrorFactory(error.message)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(serverErrorObject)
        }
    }
}
