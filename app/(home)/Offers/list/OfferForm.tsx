'use client';

import { useEffect, useState } from 'react';
import { Drawer, TextField, Typography, IconButton, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { Offer } from './OffersPage';

type OfferFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Offer>) => void;
  editingOffer?: Offer | null;
};

export default function OfferForm({ open, onClose, onSubmit, editingOffer }: OfferFormProps) {
  const [formData, setFormData] = useState<Partial<Offer>>({
    name: '',
    monthlyPrice: 0,
    discountPercentage: 0,
    addedDays: 0,
    durationInMonths: 12,
  });

  useEffect(() => {
    if (editingOffer) {
      setFormData({
        name: editingOffer.name,
        monthlyPrice: editingOffer.monthlyPrice,
        discountPercentage: editingOffer.discountPercentage,
        addedDays: editingOffer.addedDays,
        durationInMonths: editingOffer.durationInMonths,
      });
    } else {
      setFormData({
        name: '',
        monthlyPrice: 0,
        discountPercentage: 0,
        addedDays: 0,
        durationInMonths: 12,
      });
    }
  }, [editingOffer]);

  const handleChange = (field: keyof Offer, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === '' ? undefined : Number(value),
    }));
  };
  

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 450, p: 4, borderRadius: '16px 0 0 16px' } }}
    >
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">{editingOffer ? 'Modifier l’offre' : 'Nouvelle offre'}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nom de l’offre"
            type="text"
            value={formData.name ?? ''}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

<TextField
  label="Prix mensuel"
  type="number"
  value={formData.monthlyPrice ?? ''}
  onChange={(e) => handleChange('monthlyPrice', e.target.value)}
  fullWidth
  variant="outlined"
  InputProps={{ sx: { borderRadius: 2 } }}
/>


          <TextField
            label="Réduction %"
            type="number"
            value={formData.discountPercentage ?? ''}
            onChange={(e) => handleChange('discountPercentage', e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <TextField
            label="Jours ajoutés"
            type="number"
            value={formData.addedDays ?? ''}
            onChange={(e) => handleChange('addedDays', e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <TextField
            label="Durée (mois)"
            type="number"
            value={formData.durationInMonths ?? ''}
            onChange={(e) => handleChange('durationInMonths', e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

<Button
  variant="contained"
  onClick={handleSubmit}
  sx={{ 
    mt: 2, 
    py: 1.5, 
    borderRadius: 3, 
    backgroundColor: '#94e03e', 
    color: '#fff',         
    '&:hover': {
      backgroundColor: '#82cc34', 
    },
  }}
>
  {editingOffer ? 'Enregistrer' : 'Créer'}
</Button>

        </Box>
      </motion.div>
    </Drawer>
  );
}
