import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type { Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;
const miniWidth = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: miniWidth,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.08)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? drawerWidth : miniWidth,
    width: `calc(100% - ${open ? drawerWidth : miniWidth}px)`,
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? drawerWidth : miniWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(true); // expanded by default on desktop
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDesktop = () => setOpen((p) => !p);
  const toggleMobile = () => setMobileOpen((p) => !p);

  const items = [
    { label: 'Inbox', icon: <InboxIcon /> },
    { label: 'Starred', icon: <MailIcon /> },
    { label: 'Send email', icon: <MailIcon /> },
    { label: 'Drafts', icon: <InboxIcon /> },
  ];

  const drawerContent = (
    <Box
      role='presentation'
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <DrawerHeader>
        {open && (
          <Typography variant='h6' sx={{ pl: 1, fontWeight: 600 }}>
            Inteliq
          </Typography>
        )}
        <IconButton onClick={upMd ? toggleDesktop : toggleMobile}>
          {open ? (
            theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )
          ) : theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ py: 1 }}>
        {items.map((it, idx) => (
          <ListItem key={it.label} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? it.label : ''} placement='right'>
              <ListItemButton
                sx={{
                  minHeight: 44,
                  px: 2,
                  justifyContent: open ? 'initial' : 'center',
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {idx % 2 === 0 ? it.icon : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={it.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      {/* bottom section reserved for settings/help etc. */}
      <List sx={{ py: 0.5 }}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <Tooltip title={!open ? 'Settings' : ''} placement='right'>
            <ListItemButton
              sx={{
                minHeight: 44,
                px: 2,
                justifyContent: open ? 'initial' : 'center',
                borderRadius: 1,
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary='Settings'
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar position='fixed' open={upMd ? open : false}>
        <Toolbar>
          {!upMd && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={toggleMobile}
              edge='start'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' noWrap>
            What do you want to learn today?
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile temporary drawer */}
      {!upMd && (
        <MuiDrawer
          variant='temporary'
          open={mobileOpen}
          onClose={toggleMobile}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {drawerContent}
        </MuiDrawer>
      )}

      {/* Desktop mini-variant drawer */}
      {upMd && (
        <Drawer variant='permanent' open={open}>
          {drawerContent}
        </Drawer>
      )}

      {/* Main content area */}
      {/* <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: {
            md: `calc(100% - ${upMd ? (open ? drawerWidth : miniWidth) : 0}px)`,
          },
          transition: (t) =>
            t.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        {/* Replace with actual page content/cards like the screenshot */}
      {/* <Typography variant='h5' sx={{ mb: 2, fontWeight: 600 }}>
          Hi Laurence!
        </Typography>
        <Typography sx={{ mb: 3 }} color='text.secondary'>
          Choose a quick action to get started.
        </Typography> */}
      {/* <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow:
                  '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.10)',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  opacity: 0.12,
                }}
              />
              <Typography fontWeight={600}>Quick card {i}</Typography>
              <Typography variant='body2' color='text.secondary'>
                Do a focused task with one click.
              </Typography>
            </Box>
          ))}
        </Box> */}
      {/* </Box> */}
    </Box>
  );
}
