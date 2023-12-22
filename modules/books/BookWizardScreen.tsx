import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Card} from '~/components/card/Card';

import {PageTitle} from '~/components/page-title/PageTitle';
import {Screens} from '~/stacks/Screens';
import {BookEntity} from './BookEntity';

export const BookWizardScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <>
      <PageTitle title="Book edit/create" />
      <ScrollView style={{flex: 1}}>
        <Card>
          <BookEntity
            asWizard
            fnClose={() => {
              navigation.navigate(Screens.BooksList);
            }}
          />
        </Card>
      </ScrollView>
    </>
  );
};
