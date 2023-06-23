import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { SchemaOptions, Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'lightning-chats-rooms',
  timestamps: true,
};

@Schema(options)
export class LightningChattingRoom extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  lightningBoardId: number;

  @Prop({
    type: {
      owner: { required: true, type: Number },
      applicant: { required: true, type: Number },
    },
  })
  @IsNotEmpty()
  userId: object;
}

export const LightningChattingRoomSchema = SchemaFactory.createForClass(
  LightningChattingRoom,
);
