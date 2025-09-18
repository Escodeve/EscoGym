'use client';

import { IconButton, Menu, MenuItem, Tabs, Tab, Drawer, TextField, Button, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsersRequest, createUser, editUser, editUserRequest } from '@/redux/slices/users';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { User } from '@/@Types/users';

const UsersContent: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, data } = useSelector((state: RootState) => state.users);

  const [search, setSearch] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);
  const [editable, setEditable] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    gender: 'MALE',
    accountStatus: 'ACTIVE',
    accessStatus: 'IN',
    role: 'USER',
  });

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'paid' | 'pending'>('all');

  React.useEffect(() => {
    dispatch(fetchUsersRequest({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  const users: User[] = data?.users || [];

  const filteredUsers = users.filter((u) => {
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'paid'
          ? u.paymentStatus?.toLowerCase() === 'paid'
          : u.paymentStatus?.toLowerCase() === 'pending';
    return matchesStatus;
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setDrawerOpen(true);
    setEditable(false); // fields disabled until "Modifier" clicked
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      gender: user.gender || 'MALE',
      accountStatus: user.accountStatus || 'ACTIVE',
      accessStatus: user.accessStatus || 'IN',
      role: user.role || 'USER',
    });
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${user.name} ?`)) {
      dispatch(deleteUser(user.id));
      toast.success("Utilisateur supprimé avec succès !");
    }
  };

  const handleView = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }

    if (editingUser) {
      // Only send name, email, gender, phone
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
      };

      console.log('PATCH payload:', payload); // check before sending
      dispatch(editUserRequest({ id: editingUser.id, data: payload }));

      // toast.success('Utilisateur mis à jour avec succès !');
    } else {
      // For creating, you can still send all fields
      dispatch(createUser(formData));
      // toast.success('Utilisateur créé avec succès !');
    }

    setDrawerOpen(false);
    setEditingUser(null);
    setEditable(false);
  };


  return (
    <Box className="flex flex-col w-full p-6 space-y-6 items-start rounded-5xl">
      <Typography variant="h3" className="font-bold pb-10 text-3xl">Liste des utilisateurs</Typography>

      {/* Search + Add */}
      <Box className="flex w-full justify-between items-center mb-4">
        <div className="relative w-1/2">
          <MagnifyingGlassIcon className="w-6 h-6 text-black/70 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 p-3 rounded-full border border-black/60 focus:outline-none focus:ring-2 focus:ring-[#94e03e] w-full text-lg"
          />
        </div>
        <Button
          variant="contained"
          startIcon={<PlusIcon className="w-5 h-5" />}
          onClick={() => {
            setEditingUser(null);
            setDrawerOpen(true);
            setEditable(true); // fields editable for adding
            setFormData({
              name: '',
              email: '',
              phone: '',
              gender: 'MALE',
              accountStatus: 'ACTIVE',
              accessStatus: 'IN',
              role: 'USER',
            });
          }}
          sx={{ bgcolor: 'black', color: 'white', px: 4, py: 1.5, textTransform: 'none', fontWeight: 'bold', fontSize: '1rem', '&:hover': { bgcolor: '#7bc32d' } }}
        >
          Ajouter Utilisateur
        </Button>
      </Box>

      {/* Status Tabs */}
      <Box className="w-full mb-4">
        <Tabs
          value={statusFilter}
          onChange={(_, newValue) => setStatusFilter(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 'bold', fontSize: '1rem' }, '& .Mui-selected': { color: '#94e03e !important' }, '& .MuiTabs-indicator': { backgroundColor: '#94e03e' } }}
        >
          <Tab label="Tous" value="all" />
          <Tab label="Payés" value="paid" />
          <Tab label="En attente" value="pending" />
        </Tabs>
      </Box>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Nom', 'Email', 'Téléphone', 'Plan', 'Durée (mois)', 'Début', 'Fin', 'Paiement', 'Statut', 'Actions'].map((header, index) => (
                <th key={index} className={`px-4 py-3 text-left ${index === 0 ? 'rounded-tl-lg' : ''} ${index === 9 ? 'text-center rounded-tr-lg' : ''}`} style={{ backgroundColor: '#94e03e', color: '#ffffff' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <motion.tr key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }} className="border-b">
                  <td className="px-4 py-3 text-center"><div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium">{user.name || '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg">{user.email || '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg">{user.phone || '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">{user.membershipPlanName || '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg">{user.membershipDuration || '-'} mois</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg">{user.startDate ? new Date(user.startDate).toLocaleDateString() : '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg">{user.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg">{user.paymentStatus || '-'}</div></td>
                  <td className="px-4 py-3 text-center"><div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg">{user.accountStatus || '-'}</div></td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <IconButton onClick={(e) => { setMenuAnchor(e.currentTarget); setSelectedUser(user); }} sx={{ borderRadius: 2, color: 'black' }}><PaymentIcon /></IconButton>
                      <IconButton onClick={() => handleView(user)} sx={{ borderRadius: 2, color: 'black' }}><VisibilityIcon /></IconButton>
                      <IconButton onClick={(e) => { setMenuAnchor(e.currentTarget); setSelectedUser(user); }} sx={{ borderRadius: 2, color: 'black' }}><MoreVertIcon /></IconButton>
                    </div>
                  </td>
                </motion.tr>
              )) : (
                <tr><td colSpan={10} className="text-center py-10"><Typography variant="h6" color="textSecondary">Aucun utilisateur trouvé</Typography></td></tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { if (selectedUser) handleEdit(selectedUser); setMenuAnchor(null); }}><EditIcon fontSize="small" sx={{ mr: 1 }} /> Modifier</MenuItem>
        <MenuItem onClick={() => { if (selectedUser) handleDelete(selectedUser); setMenuAnchor(null); }}><DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Supprimer</MenuItem>
      </Menu>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 450, p: 4, borderRadius: '16px 0 0 16px' } }}>
        <motion.div initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} transition={{ duration: 0.3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">{editingUser ? `Modifier ${editingUser.name}` : 'Ajouter un utilisateur'}</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Nom" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} fullWidth variant="outlined" disabled={editingUser ? !editable : false} />
            <TextField label="Email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} fullWidth variant="outlined" disabled={editingUser ? !editable : false} />
            <TextField label="Téléphone" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} fullWidth variant="outlined" disabled={editingUser ? !editable : false} />
            <TextField select label="Genre" value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)} fullWidth variant="outlined" disabled={editingUser ? !editable : false}>
              <MenuItem value="MALE">MALE</MenuItem>
              <MenuItem value="FEMALE">FEMALE</MenuItem>
            </TextField>
            <TextField select label="Statut du compte" value={formData.accountStatus} onChange={(e) => handleChange('accountStatus', e.target.value)} fullWidth variant="outlined" disabled={editingUser ? !editable : false}>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </TextField>
            <TextField select label="Statut d'accès" value={formData.accessStatus} onChange={(e) => handleChange('accessStatus', e.target.value)} fullWidth variant="outlined" disabled={editingUser ? !editable : false}>
              <MenuItem value="IN">IN</MenuItem>
              <MenuItem value="OUT">OUT</MenuItem>
            </TextField>

            <Box className="flex justify-between mt-4">
              {editingUser && !editable && (
                <Button variant="contained" sx={{ bgcolor: '#94e03e', '&:hover': { bgcolor: '#82cc34' } }} onClick={() => setEditable(true)}>Modifier</Button>
              )}
              <Button variant="contained" sx={{ bgcolor: '#94e03e', '&:hover': { bgcolor: '#82cc34' } }} onClick={handleSubmit}>{editingUser ? 'Enregistrer' : 'Créer'}</Button>
            </Box>
          </Box>
        </motion.div>
      </Drawer>
    </Box>
  );
};

export default UsersContent;
