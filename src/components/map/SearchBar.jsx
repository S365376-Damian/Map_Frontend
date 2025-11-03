import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemButton,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ label = "Search", onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchAddress = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
          {
            headers: {
              'User-Agent': 'AccessibilityMap/1.0',
              'Accept-Language': 'en'
            }
          }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchAddress, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (result) => {
    onSelect({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      name: result.display_name
    });
    setQuery('');
    setResults([]);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', zIndex: 1000 }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.secondary' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder={`Enter ${label.toLowerCase()}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: loading ? <CircularProgress size={20} /> : <SearchIcon />
        }}
      />
      {results.length > 0 && (
        <Paper sx={{ mt: 1, position: 'absolute', width: '100%', maxHeight: 300, overflow: 'auto' }}>
          <List>
            {results.map((result, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSelect(result)}>
                  {result.display_name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
