import { TextField, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';

interface FiltersProps {
  searchName: string;
  setSearchName: (value: string) => void;
  filterDate: string;
  setFilterDate: (value: string) => void;
  onSearch: () => void;
}

export default function AccessFilters({
  searchName,
  setSearchName,
  filterDate,
  setFilterDate,
  onSearch,
}: FiltersProps) {
  const handleReset = () => {
    setSearchName('');
    setFilterDate('');
    onSearch(); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-lg rounded-xl mb-6"
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        alignItems="center"
        justifyContent="flex-end"
      >
    
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" >
          <motion.div whileHover={{ scale: 1.03 }}>
            <TextField
              label="Rechercher par nom"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                width: 250,
                backgroundColor: '#f9fafb',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#94e03e' },
                  '&:hover fieldset': { borderColor: '#7ac12d' },
                  '&.Mui-focused fieldset': { borderColor: '#6fa21d' },
                },
              }}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <TextField
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                width: 180,
                xs: { width: '100%' },
                sm: { width: 180 },
                backgroundColor: '#f9fafb',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#94e03e' },
                  '&:hover fieldset': { borderColor: '#7ac12d' },
                  '&.Mui-focused fieldset': { borderColor: '#6fa21d' },
                },
              }}
            />
          </motion.div>
        </Stack>

      
        <Stack direction="row" spacing={2}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              onClick={onSearch}
              sx={{
                backgroundColor: '#94e03e',
                color: '#fff',
                py: 1.5,
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: '#7ac12d', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' },
              }}
            >
              Appliquer
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{
                color: '#94e03e',
                borderColor: '#94e03e',
                py: 1.5,
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#f0fdf4', borderColor: '#7ac12d' },
              }}
            >
              Vider
            </Button>
          </motion.div>
        </Stack>
      </Stack>
    </motion.div>
  );
}
