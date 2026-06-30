import { createTheme } from '@mui/material/styles';
import { createThemeFromTokens } from './styleCreator';

export const theme = createTheme(createThemeFromTokens());

export default theme;
