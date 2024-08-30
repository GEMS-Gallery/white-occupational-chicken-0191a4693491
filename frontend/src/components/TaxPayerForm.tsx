import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';

interface TaxPayerFormProps {
  onAddTaxPayer: (data: any) => void;
}

const TaxPayerForm: React.FC<TaxPayerFormProps> = ({ onAddTaxPayer }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    onAddTaxPayer(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New TaxPayer
      </Typography>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: 'First name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: 'Last name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        defaultValue=""
        rules={{ required: 'Address is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Address"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add TaxPayer
      </Button>
    </Box>
  );
};

export default TaxPayerForm;
