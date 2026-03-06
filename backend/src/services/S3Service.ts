import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.S3_REGION || "us-west-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
    });
    this.bucketName = process.env.S3_BUCKET_NAME || "";
  }

  async uploadImage(file: File | Blob, keyPrefix: string): Promise<string> {
    if (!this.bucketName) {
      throw new Error("S3 bucket name is not configured.");
    }

    const fileKey = `${keyPrefix}/${uuidv4()}.${(file as any).name?.split(".").pop() || "jpg"}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: buffer,
      ContentType: (file as any).type || "application/octet-stream",
      ContentLength: buffer.byteLength,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      // Return the key — call getPresignedUrl() to generate a client-accessible URL
      return fileKey;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload image to S3.");
    }
  }

  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    return getSignedUrl(this.s3Client, command, { expiresIn });
  }
}

export default S3Service;
