import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose'

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]})
  userId: mongoose.ObjectId;

  @Prop()
  token: string;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);