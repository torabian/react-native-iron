import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';

import {FloatingAction} from 'react-native-floating-action';
import {Screens} from '~/stacks/Screens';
import {AdvancedList} from '../../components/list/AdvancedList';
import {BookDto} from './BookDto';
import {BookEditForm} from './BookEditForm';
import {BookEntity} from './BookEntity';
import {BookFilterForm} from './BookFilterForm';
import {BookFilterValidator} from './BookFilterValidator';
import {BookAction, bookFloatingActions} from './BookFloatingActions';
import {BooksInteractionPool} from './BookInteractionPool';
import {BookListItem, BookListItemLoader} from './BookListItem';

export const BooksListScreen = ({}: {}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const onActionSelect = (name?: string) => {
    if (name === BookAction.NewBook) {
      navigation.navigate(Screens.BookForm);
    }
    if (name === BookAction.NewBookWizard) {
      navigation.navigate(Screens.BookWizard);
    }
  };

  return (
    <>
      <AdvancedList
        keyExtractor={BookDto.getPrimaryKey}
        filtersValidationSchema={BookFilterValidator}
        RenderItem={BookListItem}
        RenderPlaceHolder={BookListItemLoader}
        queryKey="Books"
        EditForm={BookEditForm}
        FilterForm={BookFilterForm}
        EntityManager={BookEntity}
        title={'Books'}
        description={'Manage all of the Books here'}
        interactionPool={BooksInteractionPool}
      />
      <FloatingAction
        actions={bookFloatingActions}
        onPressItem={onActionSelect}
      />
    </>
  );
};
