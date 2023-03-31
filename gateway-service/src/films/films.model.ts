export class Film {
    constructor(
      public id: string,
      public title: string,
      public director: string,
      public year: number,
      public actors: string[],
    ) {}
  }