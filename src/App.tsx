import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const { currentTab } = useParams();
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [currentTab]);

  return (
    <>
      <h1>Daily Lectionary</h1>
      <h2>Tab: {currentTab}</h2>
      <h2>{count}</h2>
    </>
  );
}

export default App;
