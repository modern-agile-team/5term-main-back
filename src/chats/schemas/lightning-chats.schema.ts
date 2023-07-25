import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { SchemaOptions, Document } from 'mongoose';
import { LightningChattingRoom } from '@src/chats/schemas/lightning-chats-rooms.schema';

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

  @Prop({ type: mongoose.Types.ObjectId, ref: LightningChattingRoom.name })
  @IsNotEmpty()
  chatting_room_id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export const LightningChattingSchema =
  SchemaFactory.createForClass(LightningChatting);
