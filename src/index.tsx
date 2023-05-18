import { createRoot } from 'react-dom/client';
import { Trigger } from './components';

import './style/variable.less';

import './index.less';

const App = () => {
  const visibleChange = () => {};

  const onButtonClick = () => {
    console.log('button clicked');
  };

  return (
    <>
      <div className="app-container">
        <Trigger
          title="hello world!!!hello world!!!hello world!!!hello world!!!"
          color="#108ee9"
          placement={'bottomLeft'}
          onOpenChange={visibleChange}
        >
          <button onClick={onButtonClick}>TRIGGER BUTTON</button>
        </Trigger>
        {/* <Trigger title={'OTHER'}>
          <button>ANOTHER TRIGGER</button>
        </Trigger> */}
      </div>
    </>
  );
};

const root = document.querySelector('#root');
root && createRoot(root).render(<App />);
