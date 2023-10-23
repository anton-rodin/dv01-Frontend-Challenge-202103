import Statistics from '../Statistics';
import { Provider } from 'react-redux';
import store from '../../store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App container is-max-desktop">
        <Statistics />
      </div>
    </Provider>
  );
};

export default App;
