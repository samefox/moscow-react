import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Clients from './containers/Clients'
import Api from './services/api';
import * as clientsActions from './store/clients/actions';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Api.clientGet().then((result) => {
      dispatch(clientsActions.clientGet(result.length ? result : []));
    });
  }, [dispatch]);

  return (
      <Clients />
  );
}

export default App;
