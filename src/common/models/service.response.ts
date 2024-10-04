import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly message: string;
  readonly response: T;
  readonly statusCode: number;

  private constructor(message: string, responseObject: T, statusCode: number) {
    this.message = message;
    this.response = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(message: string, response: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(message, response, statusCode);
  }

  static failure<T>(message: string, response: T, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new ServiceResponse(message, response, statusCode);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });