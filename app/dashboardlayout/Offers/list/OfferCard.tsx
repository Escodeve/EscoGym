'use client';

import { Offer } from './OffersPage';
import { Box, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

type OfferCardProps = {
  offer: Offer;
  onEdit: (offer: Offer) => void;
  onDelete: (id: number) => void;
};

export default function OfferCard({ offer, onEdit, onDelete }: OfferCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02, boxShadow: '0px 8px 20px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          borderRadius: 3,
          p: 3,
          mb: 3,
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>Prix mensuel: ${offer.montlyPrice}</Typography>
          <Typography variant="body2">Réduction: {offer.discountPercentage}%</Typography>
          <Typography variant="body2">Jours ajoutés: {offer.addedDyas}</Typography>
          <Typography variant="body2">Durée: {offer.durationInMonths} mois</Typography>
        </Box>
        <Box>
          <IconButton color="primary" onClick={() => onEdit(offer)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(offer.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );
}
