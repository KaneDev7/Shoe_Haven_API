import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { userRole } from '../constants/constant';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ unique: true })
    username: string;

    @Prop()
    password: string;

    @Prop({ unique: true })     
    email: string;

    @Prop()
    token: string;

    @Prop({default: userRole.User})
    role: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: [] })
    addresses: string[];


    @Prop({ type: [{ productId: String, quantity: Number }], default: [] })
    cart: { productId: string; quantity: number }[];
}

export const UserSchema = SchemaFactory.createForClass(User);