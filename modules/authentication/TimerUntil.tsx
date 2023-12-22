import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const TimerUntil = ({
  until,
  onResend,
}: {
  until: string | Date | moment.Moment;
  onResend: () => void;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const ref = useRef<number>();

  const clear = () => {
    if (ref.current) {
      clearInterval(ref.current);
    }
  };

  useEffect(() => {
    const seconds = moment(until).diff(moment(), 'second');

    if (seconds <= 0) {
      setSecondsLeft(0);
      clear();
    } else {
      setSecondsLeft(seconds);
      ref.current = setInterval(() => {
        setSecondsLeft(s => s - 1);
        if (seconds <= 0) {
          clear();
        }
      }, 1000);
    }

    return () => {
      clear();
    };
  }, [until]);

  if (secondsLeft <= 0) {
    return (
      <TouchableOpacity onPress={onResend}>
        <Text style={styles.secondsLeft}>
          Tap to resend the activation code
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text style={styles.secondsLeft}>
      Please wait {secondsLeft} seconds more
    </Text>
  );
};

const styles = StyleSheet.create({
  secondsLeft: {
    marginTop: 10,
    textAlign: 'center',
  },
});
