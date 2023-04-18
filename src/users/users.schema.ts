import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'
import { Album } from 'src/album/album.schema';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]})
  albums: Album[];
} 

export const UsersSchema = SchemaFactory.createForClass(Users);