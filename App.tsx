import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import 'react-native-gesture-handler';
import './interfaces/Exported';
import 'react-native-reanimated';
import {QueryClient, QueryClientProvider} from 'react-query';
import colors from './constants/colors';
import {AuthStack} from './stacks/AuthStack';
import {AppDrawer} from './stacks/AppStack';
import {Modal, ModalInterchange} from './components/modal/Modal';
import {useRxjs} from './hooks/useRxjs';
import {getSession, setSession} from './helpers/token';
import Toast from 'react-native-toast-message';
import {
  RemoteQueryContext as FirebackContext,
  RemoteQueryProvider as FirebackQueryProvider,
} from 'fireback-tools/core/react-tools';
import {AppConfigContext, AppConfigProvider} from './hooks/appConfigTools';
import {appDefaultConfig} from './targets/core/config';

const Root = createStackNavigator();
const queryClient = new QueryClient();

function App() {
  return (
    <AppConfigProvider initialConfig={appDefaultConfig}>
      <WithFireback>
        <AppBody />
      </WithFireback>
    </AppConfigProvider>
  );
}

function WithFireback({children}: {children: React.ReactNode}) {
  const {config} = useContext(AppConfigContext);

  return (
    <FirebackQueryProvider identifier="fireback" remote={config.remote}>
      {children}
    </FirebackQueryProvider>
  );
}

const AppBody = () => {
  const [data] = useRxjs(ModalInterchange);
  const restoreSession = async () => {
    const session = await getSession();

    if (session) {
      setSession(session);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryColor}}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root.Navigator initialRouteName="app">
            <Root.Screen
              name="app"
              component={AppDrawer}
              options={{headerShown: false}}
            />
            <Root.Screen
              name="auth"
              component={AuthStack}
              options={{headerShown: false}}
            />
          </Root.Navigator>
        </NavigationContainer>
        {data && (
          <Modal
            Body={data.Component}
            isVisible={data?.visible || false}
            onClose={() => {
              ModalInterchange.next({visible: false});
            }}
            data={data.data}
            title={data.title || ''}></Modal>
        )}
      </QueryClientProvider>
      <Toast />
    </SafeAreaView>
  );
};

export default App;
