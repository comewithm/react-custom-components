import { createRoot } from 'react-dom/client';
import { Tooltip } from './components';

import './style/variable.less';

import './index.less';

const App = () => {
  return (
    <>
      <div className="app-container">
        <Tooltip title="hello world!!!">Tooltip children</Tooltip>
        <Tooltip title="hello world!!!">Tooltip children</Tooltip>
      </div>
    </>
  );
};

const root = document.querySelector('#root');
root && createRoot(root).render(<App />);
