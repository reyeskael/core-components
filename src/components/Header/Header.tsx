import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from '../Button';

type User = {
	name: string;
};

export interface HeaderProps {
	logoUrl?: string;
	user?: User;
	onLogin?: () => void;
	onLogout?: () => void;
	onCreateAccount?: () => void;
}

export const Header = ({ logoUrl, user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
	<AppBar
		position="static"
		color="default"
		elevation={0}
		sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
	>
		<Toolbar
			disableGutters
			sx={{ justifyContent: 'space-between', px: '20px', py: '15px' }}
		>
			<Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
				{logoUrl && (
					<Box
						component="img"
						src={logoUrl}
						alt="logo"
						sx={{ width: 32, height: 32, display: 'block' }}
					/>
				)}
				<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
					Acme
				</Typography>
			</Stack>

			<Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
				{user ? (
					<>
						<Typography variant="body2" sx={{ color: '#333' }}>
							Welcome, <Box component="b">{user.name}</Box>!
						</Typography>
						<Button size="small" onClick={onLogout}>Log out</Button>
					</>
				) : (
					<>
						<Button size="small" onClick={onLogin}>Log in</Button>
						<Button size="small" onClick={onCreateAccount}>Sign up</Button>
					</>
				)}
			</Stack>
		</Toolbar>
	</AppBar>
);
