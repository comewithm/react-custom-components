import React from 'react';

interface ITooltipProps {
  message?: string;
}

const Tooltip: React.FC<ITooltipProps> = (props) => {
  const { message } = props;
  return <div>Tooltip: {message}</div>;
};

export default Tooltip;
