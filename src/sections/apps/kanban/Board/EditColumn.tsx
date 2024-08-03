import { ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'store';
import { editColumn } from 'store/reducers/kanban';

// types
import { KanbanColumn } from 'types/kanban';
import { ThemeMode } from 'types/config';

interface Props {
  column: KanbanColumn;
}

// ==============================|| KANBAN BOARD - COLUMN EDIT ||============================== //

const EditColumn = ({ column }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { columns } = useSelector((state) => state.kanban);

  const handleColumnRename = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editColumn(
        {
          id: column.id,
          title: event.target.value,
          itemIds: column.itemIds
        },
        columns
      )
    );
  };

  return (
    <OutlinedInput
      fullWidth
      value={column.title}
      onChange={handleColumnRename}
      sx={{
        mb: 1.5,
        fontWeight: 500,
        '& input:focus': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.grey[50]
        },
        '& input:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.grey[50]
        },
        '& input:hover + fieldset': {
          display: 'block'
        },
        '&, & input': { bgcolor: 'transparent' },
        '& fieldset': { display: 'none' },
        '& input:focus + fieldset': { display: 'block' }
      }}
    />
  );
};

export default EditColumn;
