/**
 * @author Illya Klymov
 */
 class RequestError extends Error {
  public status: number;
     constructor(code: number, message: string = '') {
       super(message);
       this.status = code;
     }
}

export { RequestError };