import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card} from '~/components/card/Card';
import {BookDto} from './BookDto';

import {useQuery} from 'react-query';
import {PageTitle} from '~/components/page-title/PageTitle';
import {BooksInteractionPool} from './BookInteractionPool';
import {RowValue} from '~/components/row-value/RowValue';
import {BookParamList} from './BookHelper';
import {useBook} from './BookHooks';

export const BookSingleScreen = () => {
  const {data, refetch, isRefetching, item} = useBook();

  const [userRefreshed, setUserRefreshed] = useState<boolean>(false);
  const onRefresh = () => {
    setUserRefreshed(true);
    refetch();
  };

  useEffect(() => {
    if (!isRefetching) {
      setUserRefreshed(false);
    }
  }, [isRefetching]);

  useEffect(() => {
    refetch();
  }, [item]);

  const vData = data?.data;

  return (
    <>
      <PageTitle title="Book detail" />

      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={userRefreshed} onRefresh={onRefresh} />
        }>
        <Card>
          <RowValue label={'Author'} value={vData?.author} />
          <RowValue label={'Country'} value={vData?.country} />
          <RowValue label={'Image Link'} value={vData?.imageLink} />
          <RowValue label={'Language'} value={vData?.language} />
          <RowValue label={'Under Age Access'} value={vData?.underAgeAccess} />
          <RowValue label={'Link'} value={vData?.link} />
          <RowValue
            label={'First Release Date'}
            value={vData?.firstReleaseDate}
          />
          <RowValue label={'Pages'} value={vData?.pages} />
          <RowValue label={'Cover Color'} value={vData?.coverColor} />
          <RowValue label={'Title'} value={vData?.title} />
          <RowValue label={'Year'} value={vData?.year} />
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  label: {fontWeight: 'bold'},
});
