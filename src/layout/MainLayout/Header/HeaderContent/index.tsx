// import { useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// project import
// import Search from './Search';
// import Message from './Message';
// import Profile from './Profile';
// import Localization from './Localization';
// import Notification from './Notification';
// import Customization from './Customization';
// import MobileSection from './MobileSection';
// import MegaMenuSection from './MegaMenuSection';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';

// types
import { MenuOrientation } from 'types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useConfig();
  // const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const localization = useMemo(() => <Localization />, [i18n]);

  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {/* <Search /> */}
      {/* {!downLG && megaMenu}
      {!downLG && localization} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification />
      <Message />
      <Customization /> */}
      {/* <Profile /> */}
      {/* {downLG && <MobileSection />} */}
    </>
  );
};

export default HeaderContent;
