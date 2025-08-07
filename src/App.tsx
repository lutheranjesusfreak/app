import { useEffect, useState } from 'react';
import queryString from 'query-string';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const tab = parsed.currentTab;
    if (typeof tab === 'string') {
      setCurrentTab(tab);
    }
  }, []);

  return (
    <>
      <h1>Daily Lectionary</h1>
      <h2>{currentTab}</h2>
    </>
  );
}

export default App;
