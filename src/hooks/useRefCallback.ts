import { useCallback, useRef } from 'react';

export const useRefCallback = <T extends Function>(callback: T): T => {
  const ref = useRef<any>();

  ref.current = callback;

  const callbackFn = useCallback<T>((...args: any[]) => {
    return ref.current?.(...args);
  }, []);

  return callbackFn;
};
