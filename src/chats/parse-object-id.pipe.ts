import { ObjectID } from 'mongodb';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  public transform(value: any): ObjectID {
    try {
      const transformedObjectId: ObjectID = new mongoose.Types.ObjectId(value);
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException('Validation failed (ObjectId is expected)');
    }
  }
}
