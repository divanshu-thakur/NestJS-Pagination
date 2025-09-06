import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserForm from './components/UserForm';
import UserSearch from './components/UserSearch';
import UserTable from './components/UserTable';
import api, { User } from './services/api';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<true | false>(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof User>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc'); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getUsers(searchTerm, sortBy, order, page, limit);
      setUsers(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, sortBy, order, page, limit]);

  const handleUserAdded = () => {
    fetchUsers();
  };

  const handleRequestSort = (property: keyof User) => {
    const isAsc = sortBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
    setPage(1);
  };

  const handleSearchClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    setSearchTerm(searchInput.trim());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <UserForm onUserAdded={handleUserAdded} />
        <UserSearch
          loading={loading}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
        />
        <UserTable
          users={users}
          loading={loading}
          sortBy={sortBy}
          order={order}
          onRequestSort={handleRequestSort}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
