export abstract class ResolverHelper {
  protected LogImportantError(err: Error) {
    if (err?.message.includes('UNAVAILABLE'))
      console.error(`${new Date().toISOString()} error:${err.message}`);
  }

  protected base64ToBlob(base64: string, filename: string) {
    const match = base64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) return null;

    const [, type, imgStr] = match;
    return {
      file: new Blob([Buffer.from(imgStr, 'base64')], { type }),
      type,
      filename: `${filename}.${type.split('/')[1]}`,
    };
  }
}
