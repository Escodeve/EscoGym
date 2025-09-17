'use client';

import { useState, useEffect } from 'react';
import { Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import OfferForm, { Offer } from './OfferForm';
import OffersTable from './OffersTable';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchPlansRequest,
  createPlanRequest,
  updatePlanRequest,
  deletePlanRequest,
} from '@/redux/slices/offers';
import { RootState } from '@/redux/store';

export default function OffersPage() {
  const dispatch = useDispatch();
  const { plans, loading } = useSelector((state: RootState) => state.offers);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

 
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);

  useEffect(() => {
    dispatch(fetchPlansRequest());
  }, [dispatch]);

  const handleOpenDrawer = (offer?: Offer) => {
    setEditingOffer(offer || null);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => setDrawerOpen(false);



  const handleSubmit = (data: Partial<Offer>) => {
    if (editingOffer) {
      dispatch(updatePlanRequest({ id: editingOffer.id, payload: data }));
      toast.success('Offer updated successfully!');
    } else {
      dispatch(createPlanRequest(data));
      toast.success('Offer created successfully!');
    }
    handleCloseDrawer();
  };
  
 
  const handleDeleteClick = (offer: Offer) => {
    setOfferToDelete(offer);
    setDeleteDialogOpen(true);
  };
  
  console.log('Deleting id:', offerToDelete?.id, typeof offerToDelete?.id);
  
  const handleConfirmDelete = () => {
    if (offerToDelete && offerToDelete.id != null) {
      dispatch(deletePlanRequest(Number(offerToDelete.id)));
      toast.success('Offer deleted successfully!'); 
    }
    setDeleteDialogOpen(false);
    setOfferToDelete(null);
  };
  
  

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setOfferToDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Gestion des Offres
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDrawer()}
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#333333' },
          }}
        >
          Nouvelle offre
        </Button>
      </Stack>

      <OffersTable
        offers={plans}
        onEdit={handleOpenDrawer}
        onDelete={handleDeleteClick}
      />

      <OfferForm
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmit}
        editingOffer={editingOffer}
      />

 
      <Dialog
  open={deleteDialogOpen}
  onClose={handleCancelDelete}
  PaperProps={{
    sx: {
      borderRadius: 3,
      p: 2,
      minWidth: 360,
      backgroundColor: '#f9f9f9',
    },
  }}
>
 

  <DialogContent sx={{ textAlign: 'center', fontSize: 16, color: '#333' }}>
    Êtes-vous sûr de vouloir supprimer l'offre ?
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', gap: 2, mt: 1 }}>
    <Button
      onClick={handleCancelDelete}
      variant="outlined"
      sx={{
        color: '#555',
        borderColor: '#ccc',
        '&:hover': { backgroundColor: '#eee', borderColor: '#bbb' },
        minWidth: 100,
      }}
    >
      Annuler
    </Button>

    <Button
      onClick={handleConfirmDelete}
      variant="contained"
      sx={{
        backgroundColor: '#d32f2f',
        color: '#fff',
        '&:hover': { backgroundColor: '#b71c1c' },
        minWidth: 100,
      }}
    >
      Supprimer
    </Button>
  </DialogActions>
</Dialog>

    </motion.div>
  );
}
