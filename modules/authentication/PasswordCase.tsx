import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import loaderAnim from '~/assets/animations/tick3.json';

export const PasswordCase = ({
  children,
  logic,
  input,
}: {
  children: any;
  logic: (...props: any) => boolean;
  input: string;
}) => {
  const [conditionMet, setConditionMet] = useState(false);
  const ref = useRef<AnimatedLottieView | null>();

  useEffect(() => {
    const met = logic && logic(input);

    if (met && !conditionMet) {
      ref.current?.play(0, 53);
    }

    if (!met && conditionMet) {
      ref.current?.play(53, 0);
    }

    setConditionMet(met);
  }, [input]);

  return (
    <View style={styles.passwordCase}>
      <AnimatedLottieView
        ref={r => (ref.current = r)}
        source={loaderAnim}
        autoPlay={false}
        loop={false}
        style={{width: 25, height: 25}}
      />
      <Text style={styles.passwordCaseText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordCase: {
    flexDirection: 'row',
  },
  passwordCaseText: {
    marginLeft: 5,
  },
});
