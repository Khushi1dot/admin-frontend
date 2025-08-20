import { useState, useEffect } from "react";

import {
  Modal,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Avatar,
  Select,
  InputLabel,
  Alert,
  Snackbar,
  FormControl,
  Typography ,
  Chip
} from "@mui/material";

import moment from 'moment-timezone';

import {languageData,getCountries, getStatesByCountry,currencyList} from '@/utils/countryData';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EditUserModal({ open, onClose, user, onUserUpdated, auth }) {

  const [formData, setFormData] = useState({
    name: '',
    status: '',
    email: '',
    phoneNumber: '',
    state: '',
    country: '',
    timeZone: '',
    zipCode: '',
    organization: '',
    address: '',

    currency: ''
  });

   const [countries, setCountries] = useState([]);

  const [states, setStates] = useState([]);
const [country, setCountry] = useState('');
const [state, setState] = useState('');
  const [language, setLanguage] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [timezones, setTimezones] = useState([]);
const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        status: user.status || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        state: user.state || '',
        country: user.country || '',
        timeZone: user.timeZone || '',
        zipCode: user.zipCode || '',
        organization: user.organization || '',

        address: user.address || '',
        currency: user.currency || ''

      });

      if (Array.isArray(user.language)) {
      setLanguage(user.language);
    } else if (typeof user.language === 'string' && user.language.trim() !== '') {

      setLanguage([user.language]);
    } else {

      setLanguage([]);
    }

    if (user.country) {
      setStates(getStatesByCountry(user.country));
      setTimezones(moment.tz.zonesForCountry(user.country) || []);
    }
  }
}, [user]);

  useEffect(() => {

    setCountries(getCountries());

  }, []);

   const handleCountryChange = (e) => {
     const countryCode = e.target.value;

    //  setCountry(countryCode);

      setFormData(prev => ({ ...prev, country: countryCode }));

     setStates(getStatesByCountry(countryCode));

    //  setState('');

      setTimezones(moment.tz.zonesForCountry(countryCode) || []);
   };
 
  const handleStateChange = (e) => {
   const stateName = e.target.value;

  //  setState(stateName);

   setFormData(prev => ({ ...prev, state: stateName }));
 };

  const handleChange = (field,value) => {

    setFormData((prev) => ({ ...prev, [field]: value }));

  };

  const handleLanguageChange = (event) => {

     const {
      target: { value }
    } = event

    setLanguage(typeof value === "string" ? value.split(",") : value);
  };
  
   const handleDelete = valueToDelete => {
    setLanguage(prev => prev.filter(lang => lang !== valueToDelete))
  }
  
   const handleAvatarChange = e => {
   const file = e.target.files[0];

  if (file) {

    setAvatar(file);

    setPreview(URL.createObjectURL(file));
  }
  };


  const handleSubmit = async () => {

    try {

       const data = new FormData();

    for (let key in formData) {

      data.append(key, formData[key]);

    }
    
    if (avatar) data.append('avatar', avatar);
     data.append('language', JSON.stringify(language));

    //  language.forEach(lang => data.append('language', lang));
     const response= await auth.update(user._id, data, { ...formData, language });

     if (response.success) {

       onUserUpdated();
      onClose();
      setSnackbar({ open: true, message: 'User data Updated successfully!', severity: 'success' })
    

    } else {

      setSnackbar({ open: true, message: 'Failed to Update user', severity: 'error' })
    }
  }

    //  onUserUpdated();
    //   onClose();
    catch (err) {
      console.error("Update failed", err);
    }
  }

  
return (
    <>
    
    <Modal open={open} onClose={onClose}>
      <Box
           sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          //  width: { xs: '90vw', sm: '80vw', md: '600px' },
          maxWidth: 800,
          maxHeight: '90vh',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 3,
          outline: 'none',
          p: 4
        }}
      >
        <h2>Edit User</h2><br></br>

<Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={preview || (user?.avatar ? `${NEXT_PUBLIC_APP_URL}${user.avatar}` : '')}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Button
              variant="contained"
              component="label"
           
            >
              Upload New Photo
              <input type="file" accept='image/png, image/jpeg'  id='account-settings-upload-image' hidden onChange={handleAvatarChange} />
            </Button>
            <Typography variant="caption" display="block" mt={1}>
              Allowed JPG, GIF or PNG. Max size of 800K
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={formData.status} label='Status' onChange={(e) =>handleChange('status', e.target.value)}>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Organization" value={formData.organization} onChange={(e) => handleChange('organization', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" value={formData.phoneNumber} onChange={(e) =>handleChange('phoneNumber', e.target.value)} />
          </Grid>
        
          <Grid item xs={12} sm={6}>
                    <FormControl fullWidth >
                      <InputLabel>Country</InputLabel>
                      <Select value={formData.country} label="Country" onChange={(e) => {handleCountryChange(e)}}  MenuProps={{ PaperProps: { style: { maxHeight: 250,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none' } } }}>
          <MenuItem label='Country'value="">Select Country</MenuItem>
          {countries.map((c) => (
            <MenuItem key={c.isoCode} value={c.isoCode}>
              {c.name}
            </MenuItem>
          ))}
        </Select>

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!states.length}>
        <InputLabel>State</InputLabel>
        <Select value={formData.state} label="State" onChange={handleStateChange}  MenuProps={{ PaperProps: { style: { maxHeight: 250 ,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none'} } }}>
          <MenuItem value="">Select State</MenuItem>
          {states.map((s) => (
            <MenuItem key={s.isoCode} value={s.name}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                  </Grid>
            <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Zip Code" value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                multiple
                value={language}
                label='Langauge'
                onChange={handleLanguageChange}
                MenuProps={{ PaperProps: { style: { maxHeight: 250,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none' } } }}
              >
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {selected.map((value) => (
                      <Chip  label={value} 
                       key={value}
                                clickable
                                deleteIcon={
                                  <i className='ri-close-circle-fill' onMouseDown={event => event.stopPropagation()} />
                                } 
                                size="small" 
                                 onDelete={() => handleDelete(value)}
                                />
                    ))}
                  </Box>
                )}
              
                {languageData.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
           <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>TimeZone</InputLabel>
                     <Select label='Time Zone'  
                      value={formData.timeZone} 
                      onChange={(e) => handleChange("timeZone", e.target.value)}
                      MenuProps={{ PaperProps: { style: { maxHeight: 250 ,overflowY: 'scroll', scrollbarWidth: 'none', 
                              msOverflowStyle: 'none'} } }}>
                       <MenuItem value="">Select Time Zone</MenuItem>
          {timezones.map((tz) => (
            <MenuItem key={tz} value={tz}>
              {tz}
            </MenuItem>
          ))}
        </Select>
                    </FormControl>
                  </Grid>
                 <Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel>Currency</InputLabel>
    <Select
      label='Currency'
      value={formData.currency}
      onChange={e => handleChange('currency', e.target.value)}
      MenuProps={{ PaperProps: { style: { maxHeight: 250,overflowY: 'scroll',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none' } } }}
    >
      {currencyList.map((currency, index) => (
        <MenuItem key={index} value={currency}>{currency}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
</Grid>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Update</Button>
        </Box>
      </Box>
    </Modal>
    <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
          </>
  );
}
