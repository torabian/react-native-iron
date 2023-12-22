import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';

import {BookDto} from './BookDto';
import {BookParamList} from './BookHelper';
import {BooksInteractionPool} from './BookInteractionPool';

export function useBook() {
  const {params} = useRoute<RouteProp<BookParamList, 'Detail'>>();
  const item = params?.item;

  if (item) {
    const id = BookDto.getPrimaryKey(item);

    const {data, refetch, isRefetching} = useQuery(
      `Book_${id}`,
      () => BooksInteractionPool?.getOne(id),
      {
        initialData: {data: item},
        cacheTime: 0,
      },
    );
    return {data, refetch, isRefetching, item};
  }
  return {data: null, refetch: () => {}, isRefetching: false, item: null};
}
