import React, { useEffect, useState } from 'react';


const App = () => {
  const [appState, setAppState] = useState('this is app');
  useEffect(() => {
    setAppState('this is app state');
  }, []);
  return <>{appState}</>;
};

export default App;
