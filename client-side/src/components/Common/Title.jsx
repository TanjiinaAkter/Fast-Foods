import { Box, Typography } from '@mui/material';

function Title({ fTitle, lTitle, subTitle }) {
    return (
        <Box textAlign="center">
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                <Typography variant="h3" color="var(--secondary)">
                    {fTitle}
                </Typography>
                <Box width="0.5rem" />
                <Typography variant="h3" color="var(--primary)">
                    {lTitle}
                </Typography>
            </Box>
            {subTitle && (
                <Box maxWidth="500px" margin="auto">
                    <Typography variant="subtitle1" color="text.secondary">
                        {subTitle}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
export default Title;
