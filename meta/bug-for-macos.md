
## Bugfix:


function dependencyConfig(folder, userConfig = {}) {
  if (userConfig === null) {
    return null;
  }

  const podspecPath = (0, _findPodspec.default)(folder);

  if (!podspecPath) {
    return null;
  }

  return {
    podspecPath,
    configurations: userConfig.configurations || [],
    scriptPhases: userConfig.scriptPhases || []
  };
}

/Users/ali/work/appstarter/node_modules/react-native-macos/node_modules/@react-native-community/cli-platform-ios/build/config/index.js