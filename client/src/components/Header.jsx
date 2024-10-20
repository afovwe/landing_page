import PropTypes from 'prop-types';
import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

// PropTypes validation
Header.propTypes = {
  title: PropTypes.string.isRequired,    // 'title' should be a string and is required
  subtitle: PropTypes.string.isRequired, // 'subtitle' should be a string and is required
};

export default Header;
