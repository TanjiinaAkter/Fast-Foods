import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

const FourZeroFour = () => (
    <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
    >
        <Typography variant="h1" color="text.secondary">
            Sorry!
        </Typography>
        <Typography variant="h3" color="var(--primary)" pb="1rem">
            404 Page Not Found!
        </Typography>
        <Button startIcon={<ArrowBackIcon />} variant="outlined" color="secondary" size="large">
            Back To Home
        </Button>
    </Box>
);

export default FourZeroFour;
