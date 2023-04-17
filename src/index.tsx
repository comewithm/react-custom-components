import { createRoot } from 'react-dom/client';

const App = () => {
  return <h2>Hello World</h2>;
};

const root = document.querySelector('#root');
root && createRoot(root).render(<App />);
