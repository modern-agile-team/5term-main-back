import { IsNotEmpty, IsNumber } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { SchemaOptions, Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'study-chats-rooms',
  timestamps: true,
};

@Schema(options)
export class StudyChattingRoom extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  studyBoardId: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export const StudyChattingRoomSchema =
  SchemaFactory.createForClass(StudyChattingRoom);
