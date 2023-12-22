import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';

interface AppConfig {
  remote?: string;
  interfaceLanguage?: string;
  audioInputDevice?: string;
  audioOutputDevice?: string;
  videoInputDevice?: string;
}

export interface IAppConginContext {
  //   setConfig: (config: AppConfig) => void;
  patchConfig: (config: AppConfig) => void;
  config: AppConfig;
}

export const AppConfigContext = React.createContext<IAppConginContext>({
  //   setConfig() {},
  patchConfig() {},
  config: {},
});

async function getUserConfig() {
  const userConfig = await AsyncStorage.getItem('app_config2');
  if (!userConfig) {
    return;
  }

  try {
    const cnf = JSON.parse(userConfig);
    if (cnf) {
      return {...cnf};
    }
    return {};
  } catch (error) {}
  return {};
}

const appStorageConfig = getUserConfig();

export function AppConfigProvider({
  children,
  initialConfig,
}: {
  children: React.ReactNode;
  initialConfig: AppConfig;
}) {
  const [config, setConfig] = useState<AppConfig>({
    ...initialConfig,
    ...appStorageConfig,
  });
  const patchConfig = (config: Partial<AppConfig>) => {
    setConfig(c => {
      const newConf = {
        ...c,
        ...config,
      };

      Promise.resolve(
        AsyncStorage.setItem('app_config2', JSON.stringify(newConf)),
      );

      return newConf;
    });
  };

  return (
    <AppConfigContext.Provider value={{config, patchConfig}}>
      {children}
    </AppConfigContext.Provider>
  );
}
