import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDeliveryDatesDto, UpdateOrderStatusDto } from './DTO/order.dto';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';
import { Response, Request } from 'express';

@Controller('api/orders')
export class OrderController {
    constructor(readonly orderService: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @Res() res: Response,
    ) {
        try {
            this.orderService.create(createOrderDto)
            res.status(201).json({ status: 201, message: 'Order successfully added' })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res: Response) {
        try {
            const results = await this.orderService.findAll()
            res.status(201).json({ status: 200, data: results })

        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(
        @Res() res: Response,
        @Param() { id }: { id: string },
    ) {
        try {
            const results = await this.orderService.findOne(id)
            res.status(201).json({ status: 200, data: results })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('user/me')
    async findAllForCurrentUser(
        @Res() res: Response,
        @Req() req: Request,
    ) {
        try {
            const { userId }: { userId?: string } = req.user
            const results = await this.orderService.findAllForCurrentUser(userId)
            res.status(201).json({ status: 200, data: results.reverse() })
        } catch (error) {
            console.log(error)  
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }


    @UseGuards(JwtAuthGuard)
    @Put('update/status')
    async updateStatus(
        @Body() updateOrderStatusDto: UpdateOrderStatusDto,
        @Res() res: Response,
    ) {
        try {
            this.orderService.updateStatus(updateOrderStatusDto)
            res.status(201).json({ status: 201, message: 'Order status successfully updated' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/delivery_date')
    async updateDeliveryDate(
        @Body() updateOrderDeliveryDatesDto: UpdateOrderDeliveryDatesDto,
        @Res() res: Response,
    ) {
        try {
            this.orderService.updateDeliveryDate(updateOrderDeliveryDatesDto)
            res.status(201).json({ status: 201, message: 'Order delivery_date successfully updated' })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOne(
        @Param() { id }: { id: string },
        @Res() res: Response,
    ) {
        try {
            this.orderService.deleteOne(id)
            res.status(204).json({ status: 204, message: `Order with id ${id} successfully deleted` })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message })
        }
    }

}
