import React from 'react';
import {View} from 'react-native';
import {Map} from '~/components/map/MapView';

import {PageTitle} from '~/components/page-title/PageTitle';

export const StorybooksScreen = ({}: {}) => {
  return (
    <View style={{flex: 1}}>
      <PageTitle
        title={'story book'}
        description={'Our reusable components'}></PageTitle>

      <Map />
    </View>
  );
};
