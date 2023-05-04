import { useMemo, useState } from 'react';
import { TTriggerMode } from '../interface/tooltip';

export const useVisible = (props?: boolean) => {
  const [visible, setVisible] = useState<boolean>(props || false);

  return {
    visible,
    setVisible
  };
};

export const useShowOrHide = (mode?: TTriggerMode) => {
  const arrayMode = mode ? (Array.isArray(mode) ? mode : [mode]) : [];
  // 显示组件的list方式
  const showList = new Set<TTriggerMode>(arrayMode);
  // 隐藏组件的list方式
  const hideList = new Set<TTriggerMode>([]);

  return useMemo(() => {
    // if(showList.has('hover')) {
    //     // 存在，先删除
    //     hideList.delete('hover')
    // }
    // if(hideList.has('hover')) {
    //     showList.delete('hover')
    // }

    return [showList, hideList];
  }, [mode]);
};
