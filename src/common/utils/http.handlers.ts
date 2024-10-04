import type { Response } from "express";

import { ServiceResponse } from "@/common/models/service.response";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};