/**
 * This file is a storing the books into the async storage,
 * when user edits, or deletes them. it works as a pool as well as the
 * database in memeory. Real examples are not complictated as this.
 * only you need to implement AdvancedListInteractionPool<T> and it would be enough to pass
 * it into the AdvancedList
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {execApi} from '~/helpers/api';
import {delay, inlineFiltering} from '~/helpers/filtering';
import {IResponse, IResponseList} from '~/interfaces/JSONStyle';
import {AdvancedListInteractionPool} from '~/interfaces/Lists';
import {BookDto} from './BookDto';

let dataSet: BookDto.DTO[] = [];
class InMemoryInteractionPool {
  protected async save() {
    await AsyncStorage.setItem(this.key, JSON.stringify(dataSet));
  }

  protected async load() {
    // await AsyncStorage.removeItem(this.key);
    try {
      const data = JSON.parse((await AsyncStorage.getItem(this.key)) || '');

      if (data && Array.isArray(data)) {
        dataSet = data;
      } else {
        dataSet = this.defaultContent;
        await this.save();
      }
    } catch (err) {
      // Intentionally left blank
      dataSet = this.defaultContent;
      await this.save();
    }
  }

  constructor(protected key: string, protected defaultContent: any) {
    this.load();
  }
}

class BooksInteractionPoolMock
  extends InMemoryInteractionPool
  implements AdvancedListInteractionPool<BookDto.DTO, string>
{
  constructor() {
    super('Books', require('../../assets/mock-data/books.json'));
  }

  async getOne(id: string): Promise<IResponse<BookDto.DTO>> {
    await delay(5000);

    const item = dataSet.find(item => BookDto.getPrimaryKey(item) === id);
    if (item) {
      return {
        data: item,
      };
    } else {
      return {
        error: {
          message: 'Not found',
        },
      };
    }
  }

  async query(params: BookDto.DTO): Promise<IResponseList<BookDto.DTO>> {
    await delay(200, 600);
    const result: BookDto.DTO[] = [];

    for (let item of dataSet) {
      // @meta(metaFiltering,type:string,target:title)
      if (inlineFiltering.STRING(params, item, 'title')) continue;
      if (inlineFiltering.STRING(params, item, 'author')) continue;
      if (inlineFiltering.BOOLEAN(params, item, 'underAgeAccess')) continue;
      // @meta(end)

      result.push(item);
    }

    return {
      data: {
        items: result,
        totalItems: dataSet.length,
      },
    };
  }

  async update(dto: BookDto.DTO): Promise<BookDto.DTO> {
    dataSet = dataSet.map(item => (BookDto.isEqual(item, dto) ? dto : item));
    console.log(dto);
    this.save();
    return dto;
  }

  async create(dto: BookDto.DTO): Promise<BookDto.DTO> {
    dataSet = [dto, ...dataSet];
    this.save();
    return dto;
  }

  async remove(dto: BookDto.DTO): Promise<{affectedRows: number}> {
    dataSet = dataSet.filter(item => !BookDto.isEqual(dto, item));
    return {affectedRows: 1};
  }
}

class BooksInteractionPoolApi
  implements AdvancedListInteractionPool<BookDto.DTO, string>
{
  async getOne(id: string): Promise<IResponse<BookDto.DTO | undefined>> {
    const data = await execApi('get', `book/${id}`);
    return data;
  }

  async query(params: BookDto.DTO): Promise<IResponseList<BookDto.DTO>> {
    return await execApi('get', 'books');
  }

  async update(dto: BookDto.DTO): Promise<BookDto.DTO> {
    const data = await execApi('patch', `book/${dto.uniqueId}`, dto);
    return data;
  }

  async create(dto: BookDto.DTO): Promise<BookDto.DTO> {
    return dto;
  }

  async remove(uniqueId: string): Promise<IResponse<{affectedRows: number}>> {
    const data = await execApi('delete', `book/${uniqueId}`);
    return data;
  }
}

export const BooksInteractionPool = true
  ? new BooksInteractionPoolMock()
  : new BooksInteractionPoolApi();
