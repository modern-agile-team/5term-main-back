import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { SchemaOptions, Document } from 'mongoose';

const options: SchemaOptions = {
  collection: 'study_chats',
  timestamps: true,
};

@Schema(options)
export class StudyChatting extends Document {
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
  studyBoardNo: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Prop({ type: Date, default: false })
  deletedAt: Date;
}

export const StudyChattingSchema = SchemaFactory.createForClass(StudyChatting);
