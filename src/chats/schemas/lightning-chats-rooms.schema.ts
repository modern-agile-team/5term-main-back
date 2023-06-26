import { IsNotEmpty, IsNumber } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { SchemaOptions, Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'lightning_chats_rooms',
  timestamps: true,
};

@Schema(options)
export class LightningChattingRoom extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  lightning_board_id: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  owner: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  applicant: number;

  @Prop({ type: Date, default: false })
  deletedAt: Date | boolean;
}

export const LightningChattingRoomSchema = SchemaFactory.createForClass(
  LightningChattingRoom,
);
