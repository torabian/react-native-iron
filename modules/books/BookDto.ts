import {BookEntity} from '~/interfaces/Exported';

export namespace BookDto {
  export const isEqual = (item1: BookDto.DTO, item2: BookDto.DTO): boolean => {
    return BookDto.getPrimaryKey(item1) === BookDto.getPrimaryKey(item2);
  };

  export const getPrimaryKey = (item: BookDto.DTO) => {
    // @meta(primaryKey)
    return item.uniqueId;
  };

  export const Empty: DTO = new BookEntity();

  // We have this DTO exported from Fireback, you can
  // write them yourself
  export interface DTO extends BookEntity {}
}
