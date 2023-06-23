import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { SchemaOptions, Document } from 'mongoose';

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

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  chattingRoomId: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export const LightningChattingSchema =
  SchemaFactory.createForClass(LightningChatting);
