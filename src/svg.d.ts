declare module '*.svg' {
  const content: any;
  export default content;
}

declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};