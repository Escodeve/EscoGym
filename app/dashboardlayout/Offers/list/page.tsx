'use client';

import { useState } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import OfferForm, { Offer } from './OfferForm';
import OffersTable from './OffersTable.tsx';


export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, montlyPrice: 0, discountPercentage: 0, addedDyas: 0, durationInMonths: 1 },
    { id: 2, montlyPrice: 29, discountPercentage: 10, addedDyas: 5, durationInMonths: 6 },
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const handleOpenDrawer = (offer?: Offer) => {
    setEditingOffer(offer || null);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleSubmit = (data: Partial<Offer>) => {
    if (editingOffer) {
      setOffers((prev) =>
        prev.map((o) => (o.id === editingOffer.id ? { ...o, ...data } as Offer : o))
      );
    } else {
      const newOffer: Offer = {
        id: offers.length ? Math.max(...offers.map((o) => o.id)) + 1 : 1,
        montlyPrice: data.montlyPrice || 0,
        discountPercentage: data.discountPercentage || 0,
        addedDyas: data.addedDyas || 0,
        durationInMonths: data.durationInMonths || 1,
      };
      setOffers((prev) => [...prev, newOffer]);
    }
    handleCloseDrawer();
  };

  const handleDelete = (id: number) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-6 bg-gray-50 min-h-screen">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700}>Gestion des Offres</Typography>
        <Button
  variant="contained"
  startIcon={<AddIcon />}
  onClick={() => handleOpenDrawer()}
  sx={{
    backgroundColor: '#000000', // noir
    color: '#ffffff',           // texte blanc
    '&:hover': {
      backgroundColor: '#333333', // légèrement plus clair au survol
    },
  }}
>
  Nouvelle offre
</Button>

      </Stack>

      <OffersTable offers={offers} onEdit={handleOpenDrawer} onDelete={handleDelete} />

      <OfferForm
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
        editingOffer={editingOffer}
      />
    </motion.div>
  );
}
