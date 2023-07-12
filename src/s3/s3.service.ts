import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as config from 'config';

@Injectable()
export class S3Service {
  s3Adress = `https://haruserver.s3.ap-northeast-2.amazonaws.com/`;
  async s3Upload(file, userNo) {
    const s3Config = config.get('s3');

    const s3 = new S3({
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
    });

    const params = {
      Key: `main-user/userNo:${userNo}`,
      Body: file.buffer,
      Bucket: s3Config.bucket,
    };

    const isDone = await s3.putObject(params).promise();

    const url = this.s3Adress + params.Key;

    return isDone ? url : false;
  }

  async studyRecruitImgUpload(file, boardId, fileNo) {
    const s3Config = config.get('s3');

    const s3 = new S3({
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
    });
    const params = {
      Key: `main-studyRecruitBoard/boardId:${boardId}/${fileNo}`,
      Body: file.buffer,
      Bucket: s3Config.bucket,
    };

    const isDone = await s3.putObject(params).promise();

    const url = this.s3Adress + params.Key;

    return isDone ? { url: url, key: params.Key } : false;
  }
  async studyToolsBoardsImgUpload(file, boardId, fileNo) {
    const s3Config = config.get('s3');

    const s3 = new S3({
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
    });
    const params = {
      Key: `main-studyToolsBoards/boardId:${boardId}/${fileNo}`,
      Body: file.buffer,
      Bucket: s3Config.bucket,
    };

    const isDone = await s3.putObject(params).promise();

    const url = this.s3Adress + params.Key;

    return isDone ? { url: url, key: params.Key } : false;
  }
}
