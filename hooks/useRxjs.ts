import {useEffect, useState} from 'react';
import {Observable, tap} from 'rxjs';

export function useRxjs<T>(observable: Observable<T>) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const subscription = observable
      .pipe(tap(emit => setData(emit)))
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return [data];
}
