import { Route, Routes } from 'react-router-dom';

import { PageLayout } from '@demo/ui/components';
import { UserSearch } from '../UserSearch';
// import styles from './App.module.css';

export function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<UserSearch />} />
      </Routes>
    </PageLayout>
  );
}
