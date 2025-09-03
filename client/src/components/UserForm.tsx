import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import api, { CreateUserDto } from '../services/api';

interface UserFormProps {
  onUserAdded: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateUserDto>();

  const onSubmitSingle = async (data: CreateUserDto) => {
    try {
      setLoading(true);
      await api.createUser(data);
      toast.success('User added successfully!');
      reset();
      onUserAdded();
    } catch (error) {
      toast.error('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitBulk = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textarea = event.currentTarget.querySelector('textarea');
    if (!textarea) return;

    try {
      const users = JSON.parse(textarea.value);
      if (!Array.isArray(users)) {
        throw new Error('Input must be an array of users');
      }

      setLoading(true);
      await api.createBulkUsers(users);
      toast.success('Users added successfully!');
      textarea.value = '';
      onUserAdded();
    } catch (error) {
      toast.error('Failed to add users. Please check the JSON format.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Users
      </Typography>

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Single User" />
        <Tab label="Bulk Users" />
      </Tabs>

      {activeTab === 0 ? (
        <Box component="form" onSubmit={handleSubmit(onSubmitSingle)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Add User'}
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={onSubmitBulk}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Bulk Users (JSON)"
            margin="normal"
            placeholder='[{"name": "John Doe", "email": "john@example.com"}, ...]'
            sx={{ fontFamily: 'monospace' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Users'}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default UserForm; 