import React from 'react';
import Trigger from '../Trigger/trigger';

import './tooltip.less';

interface ITTooltipProps {
  children: React.ReactElement;
}

const Tooltip: React.FC<ITTooltipProps> = (props) => {
  const { children } = props;

  return <Trigger>{children}</Trigger>;
};

export default Tooltip;
