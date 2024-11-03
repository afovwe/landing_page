import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Grid
} from '@mui/material';


import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const HeroAdminSection = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    seasonalLabel: '',
    title: '',
    make: '',
    type: '',
    description: '',
    statistics: [{ label: '', value: '' }],
    shoes: [{ thumbnail: '', bigShoe: '', alt: '', order: 0 }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const updatedArray = [...formValues[arrayName]];
    updatedArray[index][name] = value;
    setFormValues((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleAddField = (arrayName) => {
    const newField = arrayName === 'statistics' ? { label: '', value: '' } : { thumbnail: '', bigShoe: '', alt: '', order: 0 };
    setFormValues((prev) => ({ ...prev, [arrayName]: [...prev[arrayName], newField] }));
  };

  const handleRemoveField = (index, arrayName) => {
    const updatedArray = [...formValues[arrayName]];
    updatedArray.splice(index, 1);
    setFormValues((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleFileChange = (e, index, fieldName) => {
    const file = e.target.files[0];
    const updatedShoes = [...formValues.shoes];
    updatedShoes[index][fieldName] = file;
    setFormValues((prev) => ({ ...prev, shoes: updatedShoes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>Hero Section Form</Typography>

        <TextField fullWidth margin="normal" label="Seasonal Label" name="seasonalLabel" value={formValues.seasonalLabel} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Title" name="title" value={formValues.title} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Make" name="make" value={formValues.make} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Type" name="type" value={formValues.type} onChange={handleChange} />
        <TextField fullWidth multiline margin="normal" label="Description" name="description" value={formValues.description} onChange={handleChange} />

        {/* Statistics Fields */}
        <Typography variant="h6" sx={{ mt: 2 }}>Statistics</Typography>
        {formValues.statistics.map((stat, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={5}>
              <TextField fullWidth label="Label" name="label" value={stat.label} onChange={(e) => handleArrayChange(e, index, 'statistics')} />
            </Grid>
            <Grid item xs={5}>
              <TextField fullWidth label="Value" name="value" value={stat.value} onChange={(e) => handleArrayChange(e, index, 'statistics')} />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveField(index, 'statistics')}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => handleAddField('statistics')} sx={{ mt: 1 }}>Add Statistic</Button>

        {/* Shoes Fields */}
        <Typography variant="h6" sx={{ mt: 2 }}>Shoes</Typography>
        {formValues.shoes.map((shoe, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={4}>
              <TextField fullWidth label="Alt Text" name="alt" value={shoe.alt} onChange={(e) => handleArrayChange(e, index, 'shoes')} />
            </Grid>
            <Grid item xs={2}>
              <TextField fullWidth label="Order" type="number" name="order" value={shoe.order} onChange={(e) => handleArrayChange(e, index, 'shoes')} />
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" component="label">
                Upload Thumbnail
                <input type="file" hidden onChange={(e) => handleFileChange(e, index, 'thumbnail')} />
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" component="label">
                Upload Big Shoe
                <input type="file" hidden onChange={(e) => handleFileChange(e, index, 'bigShoe')} />
              </Button>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveField(index, 'shoes')}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => handleAddField('shoes')} sx={{ mt: 1 }}>Add Shoe</Button>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>Submit</Button>
      </Box>
    </Box>
  );
};

export default HeroAdminSection;
