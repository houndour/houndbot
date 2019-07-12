interface command {
  name: string;
  description: string;
  execute(message: unknown, args: string[]): void;
}
