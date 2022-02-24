import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from './components/Navbar';
import People from './components/People';
import Planet from './components/Planets';

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState('planets');
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <div className="App">
          <h1>Stars Wars Info</h1>
          <Navbar setPage={setPage} />
          <div className="content">
            {page === 'planets' ? <Planet /> : <People />}
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
