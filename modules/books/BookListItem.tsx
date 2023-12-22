import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import {Card} from '~/components/card/Card';
import {DefaultCardLoader} from '~/components/list/DefaultCardLoader';
import {RowValue} from '~/components/row-value/RowValue';
import {Screens} from '~/stacks/Screens';
import {BookDto} from './BookDto';

/**
 * This component is being shown while list is looking for first time
 * content to be loaded, update the card with general structure of the card
 */
export function BookListItemLoader() {
  return <DefaultCardLoader />;
}

/**
 * Each list item of the flat list, equal to renderItem prop on flatlist
 * with some minor modifications
 */
export function BookListItem({
  item,
  onPress,
  onLongPress,
}: {
  item: BookDto.DTO;
  onPress: (item: BookDto.DTO) => void;
  onLongPress: (event: GestureResponderEvent) => void;
}) {
  const navigation = useNavigation<any>();

  return (
    <Card
      onPress={() => navigation.navigate(Screens.BookSingle, {item})}
      onLongPress={() => navigation.navigate(Screens.BookForm, {item})}
      // onPress={() => onPress(item)}
    >
      <RowValue label={'Title'} value={item.title} />
      <RowValue label={'Author'} value={item.author} />
    </Card>
  );
}

const styles = StyleSheet.create({});
