
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './cartReducer';

const store = createStore(cartReducer);

const App = () => {
  return (
    <Provider store={store}>
      {/* Componentes do seu aplicativo */}
    </Provider>
  );
};

export default App;
