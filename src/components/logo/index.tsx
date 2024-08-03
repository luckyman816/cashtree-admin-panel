// import { Link } from 'react-router-dom';
import { To } from 'history';

// material-ui
// import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';

// project import
// import Logo from './LogoMain';
// import LogoIcon from './LogoIcon';
// import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => (
  <h1>
    {isIcon ? "" : "Admin"}
  </h1>
);

export default LogoSection;
