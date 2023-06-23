import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { SchemaOptions, Document } from 'mongoose';
import { LightningChattingRoom } from './lightning-chats-rooms.schema';

const options: SchemaOptions = {
  collection: 'lightning_chats',
  timestamps: true,
};

@Schema(options)
export class LightningChatting extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sender: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  receiver: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  chatting_room_id: LightningChattingRoom;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export const LightningChattingSchema =
  SchemaFactory.createForClass(LightningChatting);

// LightningChattingSchema.virtual('room', {
//   ref: 'LightningChattingRoom', // 참조할 collections
//   localField: 'chatting_room_id', // 현재 스키마에 선언되어 있는 참조할 필드
//   foreignField: '_id', // collections에서 참조할 필드
//   justOne: true, // 하나만 반환하는지 여부
// });
