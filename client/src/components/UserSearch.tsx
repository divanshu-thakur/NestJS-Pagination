import React from 'react';
import { Box, Button, TextField} from '@mui/material';

interface UserFormProps {
  loading: boolean,
  searchInput: string,
  setSearchInput: (v: string) => void;
  setSearchTerm: (v: string) => void;
  handleSearchClick: () => void;
}

const UserSearch: React.FC<UserFormProps> = ({
  loading,
  searchInput,
  setSearchInput,
  setSearchTerm,
  handleSearchClick
}) => {
  return (
    <Box component="form" onSubmit={handleSearchClick} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
            size="small"
            label="Search users"
            placeholder="Name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            fullWidth
        />
        <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearchClick()}
            type="button"
            disabled={loading}
        >
            Search
        </Button>
        <Button
            variant="contained"
            color="error"
            onClick={() => {
                setSearchInput('')
                setSearchTerm('')
            }}
            type="button"
            disabled={loading}
        >
            Clear
        </Button>
    </Box>
  );
}

export default UserSearch;
