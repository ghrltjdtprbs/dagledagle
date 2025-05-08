// src/domain/post/file/upload.service.ts
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CreatePresignedUrlResponseDto } from '../dto/response/create-presigned-url.response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3: S3;
  private readonly bucket: string;
  private readonly cloudfrontDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get<string>('aws.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey')!,
      },
    });

    this.bucket = this.configService.get<string>('aws.s3Bucket')!;
    this.cloudfrontDomain = this.configService.get<string>('aws.cloudfrontDomain')!;
  }

  async getPresignedUrl(originalName: string): Promise<CreatePresignedUrlResponseDto> {
    const fileExt = originalName.split('.').pop();
    const fileName = `${uuid()}.${fileExt}`;
    const key = `uploads/${fileName}`;

    const presignedUrl = await this.s3.getSignedUrlPromise('putObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: 300, // 5분
      ContentType: 'application/octet-stream',
    });

    const fileUrl = `${this.cloudfrontDomain}/${key}`;

    return {
      fileName,
      originalName,
      fileUrl,
      presignedUrl,
    };
  }
}
