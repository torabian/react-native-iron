import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, Button} from 'react-native';
// import {SocketConnection} from '~/components/socket/Socket';
import {resetSession} from '~/helpers/token';
import {useRxjs} from '~/hooks/useRxjs';
import {store} from '~/store/Store';
import {Screens} from '../../stacks/Screens';

export const Home = ({}: {}) => {
  const navigation = useNavigation<any>();

  const [session] = useRxjs(store.session);

  const logout = () => {
    resetSession();
    navigation.navigate('auth', {screen: Screens.Signin});
  };

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{paddingBottom: 40}}>
      <Text>{JSON.stringify(session, null, 2)}</Text>
      {/* <SocketConnection /> */}
      <Button title="Logout" onPress={logout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, padding: 15},
});
