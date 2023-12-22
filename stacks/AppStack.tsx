import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {HeaderBackButton} from '@react-navigation/elements';
import {BookFormScreen} from '~/modules/books/BookFormScreen';
import {BookSingleScreen} from '~/modules/books/BookSingleScreen';
import {BooksListScreen} from '~/modules/books/BooksListScreen';
import {Home} from '~/modules/home/Home';
import {StorybooksScreen} from '~/modules/Storybooks/StorybooksScreen';
import {Screens} from '~/stacks/Screens';

import AboutScreen from '~/modules/about/AboutScreen';
import {UserSettingsScreen} from '~/modules/user-settings/UserSettingsScreen';
import {BookWizardScreen} from '~/modules/books/BookWizardScreen';
import {useNavigation} from '@react-navigation/native';

// DO_NOT_DELETE_LINE:Import

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName={Screens.Home}>
      <Drawer.Screen
        name={Screens.UserSettings}
        component={UserSettingsScreen}
      />
      <Drawer.Screen name={Screens.Home} component={Home} />
      <Drawer.Screen name={Screens.About} component={AboutScreen} />
      <Drawer.Screen name={Screens.BooksList} component={BooksListScreen} />
      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
        }}
        name={Screens.BookWizard}
        component={BookWizardScreen}
      />
      <Drawer.Screen
        name={Screens.BookSingle}
        options={{
          drawerItemStyle: {display: 'none'},
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.navigate(Screens.BooksList)}
            />
          ),
        }}
        component={BookSingleScreen}
      />
      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'},
        }}
        name={Screens.BookForm}
        component={BookFormScreen}
      />
      <Drawer.Screen name={Screens.Storybooks} component={StorybooksScreen} />

      {/*DO_NOT_DELETE_LINE:Screen*/}
    </Drawer.Navigator>
  );
};
