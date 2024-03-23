import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthedLayout from './layouts/AuthedLayout';
import UnauthedLayout from './layouts/UnauthedLayout';
import TalkPage from './pages/TalkPage';

const router = createBrowserRouter([
  {
    element: <AuthedLayout />,
    children: [
      {
        path: '/users',
        element: <UserPage />,
      },
      {
        path: '/talks',
        element: <TalkPage />,
      },
    ],
  },
  {
    element: <UnauthedLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
