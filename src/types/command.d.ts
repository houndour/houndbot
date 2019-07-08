interface command {
  name: string;
  description: string;
  execute(message: any, args: string[]): void;
}
