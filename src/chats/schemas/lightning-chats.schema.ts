import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { SchemaOptions, Document } from 'mongoose';
import {
  LightningChattingRoom,
  LightningChattingRoomSchema,
} from './lightning-chats-rooms.schema';

const options: SchemaOptions = {
  collection: 'lightning-chats',
  timestamps: true,
};

@Schema(options)
export class LightningChatting extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  receiver: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LightningChattingRoomSchema',
  })
  @IsNotEmpty()
  @IsNumber()
  chattingRoomId: LightningChattingRoom;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export const LightningChattingSchema =
  SchemaFactory.createForClass(LightningChatting);
