import { useMemo } from 'react';
import { TriggerMode } from '../interface/trigger';

export const useTriggerHover = (trigger: TriggerMode) => {
  const triggerArray: TriggerMode[] = trigger
    ? Array.isArray(trigger)
      ? trigger
      : [trigger]
    : [];
  const showHoverList = new Set(triggerArray);
  const hideHoverList = new Set(triggerArray);

  return useMemo(() => {
    return [showHoverList, hideHoverList];
  }, [trigger]);
};
