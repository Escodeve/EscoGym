'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Drawer,
  TextField,
  Typography,
  IconButton,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Holiday = {
  id: number;
  name: string;
  date: string;
};

const API_BASE = 'https://gym-access-worker.gym-access.workers.dev/api/v1/config/holidays';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token manquant');
  return { Authorization: `Bearer ${token}` };
};

const formatDateFR = (isoDateString: string) => {
  if (!isoDateString) return '';
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-FR');
};

export default function HolidaysManager() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holiday | null>(null);

  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");
  
      const res = await fetch(`${API_BASE}?t=${Date.now()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
  
      });
  
      const data = await res.json();
   
      
      if (Array.isArray(data)) {
        setHolidays(data);
      } else {
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchHolidays();
  }, []);

  const addHoliday = async (holiday: Partial<Holiday>) => {
    try {
      const headers = getAuthHeaders();
      const res = await axios.post(API_BASE, holiday, { headers });

      await fetchHolidays();
      setDrawerOpen(false);
      setEditingHoliday(null);
      toast.success('Jour férié ajouté avec succès 🎉');
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  const updateHoliday = async (id: number, holiday: Partial<Holiday>) => {
    try {
      const headers = getAuthHeaders();
      const res = await axios.put(`${API_BASE}/${id}`, holiday, { headers });

      await fetchHolidays();
      setDrawerOpen(false);
      setEditingHoliday(null);
      toast.success('Jour férié modifié ✅');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors de la modification');
    }
  };

  const deleteHoliday = async () => {
    if (!holidayToDelete) return;
    try {
      const headers = getAuthHeaders();
      const res = await axios.delete(`${API_BASE}/${holidayToDelete.id}`, { headers });

      await fetchHolidays();
      toast.success('Jour férié supprimé 🗑️');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setDeleteDialogOpen(false);
      setHolidayToDelete(null);
    }
  };

  function HolidayForm() {
    const [formData, setFormData] = useState<Partial<Holiday>>({
      name: '',
      date: '',
    });

    useEffect(() => {
      if (editingHoliday) {
        const dateOnly = editingHoliday.date?.slice(0, 10) ?? '';
        setFormData({ name: editingHoliday.name, date: dateOnly });
      } else {
        setFormData({ name: '', date: '' });
      }
    }, [editingHoliday]);

    const handleChange = (field: keyof Holiday, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.date) {
        toast.error('Veuillez remplir tous les champs');
        return;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
        toast.error('Le format de la date doit être AAAA-MM-JJ');
        return;
      }
      if (editingHoliday) updateHoliday(editingHoliday.id, formData);
      else addHoliday(formData);
    };
  
    return (
      <Box p={3} width={350}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {editingHoliday ? 'Modifier un Jour Férié' : 'Ajouter un Jour Férié'}
          </Typography>
          <IconButton onClick={() => { setDrawerOpen(false); setEditingHoliday(null); }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          label="Nom"
          value={formData.name ?? ''}
          onChange={e => handleChange('name', e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{ sx: { borderRadius: 2 } }}
        />
        <TextField
          label="Date"
          type="date"
          value={formData.date ?? ''}
          onChange={e => handleChange('date', e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{ sx: { borderRadius: 2 } }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: '#94e03e',
            '&:hover': { backgroundColor: '#82cc34' },
            borderRadius: 3,
          }}
        >
          {editingHoliday ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </Box>
    );
  }


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          // backgroundColor: '#000',
          p: 1,
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#333333' },
          }}
          onClick={() => {
            setEditingHoliday(null);
            setDrawerOpen(true);
          }}
        >
          Ajouter un Jour Férié
        </Button>
      </Box>

      {loading ? (
        <Typography align="center">Chargement des jours fériés...</Typography>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg shadow-lg">
          <table
            key={holidays.map(h => h.id).join("-")} // 🔥 force rerender si liste change
            className="w-full border-collapse"
          >
            <thead>
              <tr style={{ backgroundColor: '#94e03e', color: '#fff' }}>
                <th style={{ padding: '12px 16px' }}>Nom</th>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {holidays.map((holiday) => (
                  <motion.tr
                    key={holiday.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                    style={{ borderBottom: '1px solid #ddd' }}
                  >
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>
                      {holiday.name}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>
                      {formatDateFR(holiday.date)}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditingHoliday(holiday);
                          setDrawerOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setHolidayToDelete(holiday);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </motion.tr>
                ))}
                {holidays.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: 20, color: '#999' }}>
                      Aucun jour férié défini.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingHoliday(null);
        }}
        PaperProps={{ sx: { borderRadius: '16px 0 0 16px' } }}
      >
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HolidayForm />
        </motion.div>
      </Drawer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setHolidayToDelete(null);
        }}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            minWidth: 350,
            boxShadow: '0px 8px 24px rgba(0,0,0,0.2)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center', fontSize: '1.1rem', color: '#444' }}>
          Voulez-vous vraiment supprimer le jour férié <br />
          <strong style={{ color: '#d32f2f' }}>
            {holidayToDelete?.name}
          </strong> ?
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setHolidayToDelete(null);
            }}
            variant="outlined"
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              px: 3,
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={deleteHoliday}
            color="error"
            variant="contained"
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              px: 3,
              backgroundColor: '#d32f2f',
              '&:hover': { backgroundColor: '#b71c1c' },
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
