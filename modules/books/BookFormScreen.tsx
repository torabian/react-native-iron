import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Card} from '~/components/card/Card';

import {PageTitle} from '~/components/page-title/PageTitle';
import {Screens} from '~/stacks/Screens';
import {BookEntity} from './BookEntity';
import {useBook} from './BookHooks';

export const BookFormScreen = () => {
  const navigation = useNavigation<any>();
  const {data} = useBook();

  return (
    <>
      <PageTitle title="Book edit/create" />
      <ScrollView style={{flex: 1}}>
        <Card>
          <BookEntity
            data={data?.data}
            fnClose={() => {
              navigation.navigate(Screens.BooksList);
            }}
          />
        </Card>
      </ScrollView>
    </>
  );
};
