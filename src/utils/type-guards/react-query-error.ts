interface IError {
  message: string;
  code: number;
}

const isReactQueryError = (error: unknown): error is IError => {
  return error !== null && typeof error === "object"
    ? "message" in error
    : false;
};

export default isReactQueryError