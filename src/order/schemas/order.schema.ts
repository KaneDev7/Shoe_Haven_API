import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop()
    user_id: string;

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    items: {
        productId: string,
        quantity: number,
    }[]

    @Prop()
    total_price: number;

    @Prop()
    status: 'pendding' | 'deliveried' | 'canceled';

    @Prop()
    payment_method: 'Wave' | 'Orange Money' | 'Cash'

    @Prop()
    order_date: Date;

    @Prop()
    delivery_date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);