import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import colors from '~/constants/colors';
import t from '~/constants/t';

const AboutScreen = () => {
  const config = {APP_VERSION: '1', RELEASE_DATE: '2018'};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('~/assets/images/logo.png')}
          resizeMode={'contain'}
        />
        <Text
          style={
            styles.text
          }>{`${t.about.appVersion} ${config.APP_VERSION}`}</Text>
        <Text
          style={
            styles.text
          }>{`${t.about.releaseDate}: ${config.RELEASE_DATE}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 20,
  },

  text: {
    color: colors.grayText,
    fontSize: 15,
  },
});

export default AboutScreen;
