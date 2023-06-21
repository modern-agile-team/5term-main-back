// import { IsNotEmpty, IsString } from 'class-validator';
// import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
// import { SchemaOptions, Document, Types } from 'mongoose';

// const options: SchemaOptions = {
//   collection: 'lightning-chats',
//   timestamps: true,
// };

// @Schema(options)
// export class Chatting extends Document {
//   @Prop({
//     type: {
//       _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
//       id: { type: String },
//       username: { type: String, requried: true },
//     },
//   })
//   @IsNotEmpty()
//   @IsString()
//   user: SocketModel;

//   @Prop({
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsString()
//   chat: string;
// }

// export const ChattingSchema = SchemaFactory.createForClass(Chatting);
