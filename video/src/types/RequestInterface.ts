import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from "express-joi-validation";

interface RequestInterface<T> extends ValidatedRequestSchema {
  [ContainerTypes.Query]: T
}

export type Req<T> = ValidatedRequest<RequestInterface<T>>