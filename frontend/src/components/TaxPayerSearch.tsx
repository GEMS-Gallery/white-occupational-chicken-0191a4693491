import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

interface TaxPayer {
  tid: number;
  firstName: string;
  lastName: string;
  address: string;
}

const TaxPayerSearch: React.FC = () => {
  const [searchTID, setSearchTID] = useState('');
  const [searchResult, setSearchResult] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTID) {
      setError('Please enter a TID');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const result = await backend.getTaxPayerByTID(BigInt(searchTID));
      if (result.length > 0) {
        setSearchResult(result[0]);
      } else {
        setError('No TaxPayer found with the given TID');
      }
    } catch (error) {
      console.error('Error searching for TaxPayer:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Search TaxPayer by TID
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="TID"
          variant="outlined"
          value={searchTID}
          onChange={(e) => setSearchTID(e.target.value)}
          type="number"
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {searchResult && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Search Result:</Typography>
          <Typography>TID: {searchResult.tid}</Typography>
          <Typography>Name: {searchResult.firstName} {searchResult.lastName}</Typography>
          <Typography>Address: {searchResult.address}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaxPayerSearch;
