import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerSearch from './components/TaxPayerSearch';
import { backend } from 'declarations/backend';

const HeaderImage = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1583394885876-f7744b77051f?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUwNDAyNjF8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: any) => {
    try {
      setLoading(true);
      const result = await backend.createTaxPayer(
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      if ('ok' in result) {
        await fetchTaxPayers();
      } else {
        console.error('Error adding tax payer:', result.err);
      }
    } catch (error) {
      console.error('Error adding tax payer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <HeaderImage>
        <Typography variant="h2" component="h1" sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          TaxPayer Management System
        </Typography>
      </HeaderImage>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
        </Box>
        <Box sx={{ flex: 2 }}>
          <TaxPayerSearch />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TaxPayerList taxPayers={taxPayers} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
