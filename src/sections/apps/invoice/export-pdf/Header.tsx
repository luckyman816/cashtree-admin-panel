// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

// assets
import Logo from 'assets/images/logo.png';

// types
import { InvoiceList } from 'types/invoice';

const textPrimary = '#262626';
const textSecondary = '#8c8c8c';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  detailColumn: {
    marginBottom: '12px',
    flexDirection: 'column',
    flexGrow: 2
  },
  chipTitle: {
    fontSize: '8px',
    padding: 4
  },
  chip: {
    alignItems: 'center',
    borderRadius: '4px',
    marginLeft: 52,
    marginRight: 4,
    marginBottom: 8
  },
  leftColumn: {
    flexDirection: 'column',
    width: 36,
    marginRight: 10,
    paddingLeft: 4,
    marginTop: 4
  },
  image: {
    width: 90,
    height: 28
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  title: {
    color: textPrimary,
    fontSize: '10px'
  },
  caption: {
    color: textSecondary,
    fontSize: '10px'
  }
});

interface Props {
  list: InvoiceList | null;
}

// ==============================|| INVOICE EXPORT - HEADER  ||============================== //

const Header = ({ list }: Props) => {
  const theme = useTheme();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Image src={Logo} style={styles.image} />
          <Text style={[styles.caption, { marginTop: 4 }]}>{`#${list?.invoice_id}`}</Text>
        </View>
        <View style={styles.detailColumn}>
          <View
            style={[
              styles.chip,
              {
                backgroundColor:
                  list?.status === 'Paid'
                    ? theme.palette.success.light + 20
                    : list?.status === 'Unpaid'
                    ? theme.palette.info.light + 20
                    : theme.palette.error.light + 20,
                color:
                  list?.status === 'Paid'
                    ? theme.palette.success.main
                    : list?.status === 'Unpaid'
                    ? theme.palette.info.main
                    : theme.palette.error.main
              }
            ]}
          >
            <Text style={styles.chipTitle}>{list?.status}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.title}>Date</Text>
          <Text style={styles.caption}> {list?.date && format(new Date(list?.date as string), 'dd/MM/yyyy')}</Text>
        </View>
        <View style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.title}>Due Date</Text>
          <Text style={styles.caption}> {list?.due_date && format(new Date(list?.due_date as string), 'dd/MM/yyyy')}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
