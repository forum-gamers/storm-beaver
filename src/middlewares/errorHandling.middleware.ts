export default function errorHandling(
  err: { message: string; statusCode: number; code?: string } | Error | any,
) {
  return new Error(err?.response?.data?.message || err.message || err).message;
}
