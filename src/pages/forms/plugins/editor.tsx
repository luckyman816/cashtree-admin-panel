// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project imports
import ReactDraft from 'sections/forms/plugins/ReactDraft';
import ReactQuill from 'sections/forms/plugins/ReactQuill';
import MainCard from 'components/MainCard';

// types
import { ThemeDirection, ThemeMode } from 'types/config';

// ==============================|| PLUGINS - EDITOR ||============================== //

const Editor = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          '& .rdw-editor-wrapper': {
            bgcolor: theme.palette.background.paper,
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: '4px',
            overflow: 'hidden',
            '& .rdw-editor-main': {
              px: 2,
              py: 0.5,
              border: 'none'
            },
            '& .rdw-editor-toolbar': {
              pt: 1.25,
              border: 'none',
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'grey.50',
              '& .rdw-option-wrapper': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'grey.50',
                borderColor: theme.palette.divider
              },
              '& .rdw-dropdown-wrapper': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'grey.50',
                borderColor: theme.palette.divider,
                '& .rdw-dropdown-selectedtext': {
                  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : 'grey.900'
                },
                '& .rdw-dropdownoption-default': {
                  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : 'grey.900'
                }
              }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '.rdw-dropdown-carettoopen': {
                right: '10%',
                left: 'inherit'
              },
              '.rdw-dropdown-carettoclose': {
                right: '10%',
                left: 'inherit'
              }
            })
          }
        }}
      >
        <MainCard title="React Draft" sx={{ overflow: 'visible', '& .rdw-editor-wrapper': { overflow: 'visible' } }}>
          <ReactDraft />
        </MainCard>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          '& .quill': {
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
            borderRadius: '4px',
            '& .ql-toolbar': {
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'grey.100',
              borderColor: theme.palette.divider,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px'
            },
            '& .ql-container': {
              borderColor: `${theme.palette.divider} !important`,
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
              '& .ql-editor': {
                minHeight: 135
              }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '& .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg': {
                right: '0%',
                left: 'inherit'
              }
            })
          }
        }}
      >
        <MainCard title="React Quill">
          <ReactQuill />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Editor;
