// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  CloudUploadOutlined,
  FileDoneOutlined,
  FormOutlined,
  PieChartOutlined,
  StepForwardOutlined,
  TableOutlined,
  InsertRowAboveOutlined,
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  CloudUploadOutlined,
  FileDoneOutlined,
  FormOutlined,
  PieChartOutlined,
  StepForwardOutlined,
  TableOutlined,
  InsertRowAboveOutlined,
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined
};

// ==============================|| MENU ITEMS - FORMS & TABLES ||============================== //

const formsTables: NavItemType = {
  id: 'group-forms-tables',
  title: <FormattedMessage id="forms-tables" />,
  icon: icons.FileDoneOutlined,
  type: 'group',
  children: [
    // {
    //   id: 'validation',
    //   title: <FormattedMessage id="forms-validation" />,
    //   type: 'item',
    //   url: '/forms/validation',
    //   icon: icons.FileDoneOutlined
    // },
    // {
    //   id: 'wizard',
    //   title: <FormattedMessage id="forms-wizard" />,
    //   type: 'item',
    //   url: '/forms/wizard',
    //   icon: icons.StepForwardOutlined
    // },
    // {
    //   id: 'forms-layout',
    //   title: <FormattedMessage id="layout" />,
    //   type: 'collapse',
    //   icon: icons.FormOutlined,
    //   children: [
    //     {
    //       id: 'basic',
    //       title: <FormattedMessage id="basic" />,
    //       type: 'item',
    //       url: '/forms/layout/basic'
    //     },
    //     {
    //       id: 'multi-column',
    //       title: <FormattedMessage id="multi-column" />,
    //       type: 'item',
    //       url: '/forms/layout/multi-column'
    //     },
    //     {
    //       id: 'action-bar',
    //       title: <FormattedMessage id="action-bar" />,
    //       type: 'item',
    //       url: '/forms/layout/action-bar'
    //     },
    //     {
    //       id: 'sticky-bar',
    //       title: <FormattedMessage id="sticky-bar" />,
    //       type: 'item',
    //       url: '/forms/layout/sticky-bar'
    //     }
    //   ]
    // },
    // {
    //   id: 'forms-plugins',
    //   title: <FormattedMessage id="plugins" />,
    //   type: 'collapse',
    //   icon: icons.CloudUploadOutlined,
    //   children: [
    //     {
    //       id: 'mask',
    //       title: <FormattedMessage id="mask" />,
    //       type: 'item',
    //       url: '/forms/plugins/mask'
    //     },
    //     {
    //       id: 'clipboard',
    //       title: <FormattedMessage id="clipboard" />,
    //       type: 'item',
    //       url: '/forms/plugins/clipboard'
    //     },
    //     {
    //       id: 're-captcha',
    //       title: <FormattedMessage id="re-captcha" />,
    //       type: 'item',
    //       url: '/forms/plugins/re-captcha'
    //     },
    //     {
    //       id: 'editor',
    //       title: <FormattedMessage id="editor" />,
    //       type: 'item',
    //       url: '/forms/plugins/editor'
    //     },
    //     {
    //       id: 'dropzone',
    //       title: <FormattedMessage id="dropzone" />,
    //       type: 'item',
    //       url: '/forms/plugins/dropzone'
    //     }
    //   ]
    // },
    {
      id: 'react-tables',
      title: <FormattedMessage id="react-table" />,
      type: 'collapse',
      icon: icons.InsertRowAboveOutlined,
      children: [
         {
          id: 'rt-Task',
          title: <FormattedMessage id="Task" />,
          type: 'item',
          url: '/tables/react-table/Task'
        },
         {
          id: 'rt-SecretCode',
          title: <FormattedMessage id="SecretCode" />,
          type: 'item',
          url: '/tables/react-table/SecretCode'
        },
         {
          id: 'rt-UserMetrics',
          title: <FormattedMessage id="UserMetrics" />,
          type: 'item',
          url: '/tables/react-table/UserMetrics'
        },
         {
          id: 'rt-leaderBoard',
          title: <FormattedMessage id="leaderBoard" />,
          type: 'item',
          url: '/tables/react-table/leaderBoard'
        },
         {
          id: 'rt-walletBoard',
          title: <FormattedMessage id="walletBoard" />,
          type: 'item',
          url: '/tables/react-table/walletBoard'
        },
        
        {
          id: 'rt-inviteFriends',
          title: <FormattedMessage id="inviteFriends" />,
          type: 'item',
          url: '/tables/react-table/inviteFriends'
        },
        {
         id: 'rt-dailyLogin',
         title: <FormattedMessage id="dailyLogin" />,
         type: 'item',
         url: '/tables/react-table/dailyLogin'
       },
        {
         id: 'rt-missionTask',
         title: <FormattedMessage id="missionTask" />,
         type: 'item',
         url: '/tables/react-table/missionTask'
       },
        {
         id: 'rt-dailyBooster',
         title: <FormattedMessage id="dailyBooster" />,
         type: 'item',
         url: '/tables/react-table/dailyBooster'
       },
      ]
    },
    {
      id: 'userManage',
      title: <FormattedMessage id="userManage" />,
      type: 'collapse',
      icon: icons.UserOutlined,
      url: '/tables/userManage'
    },
    // {
    //   id: 'mui-tables',
    //   title: <FormattedMessage id="mui-table" />,
    //   type: 'collapse',
    //   icon: icons.TableOutlined,
    //   children: [
    //     {
    //       id: 'mui-table',
    //       title: <FormattedMessage id="basic" />,
    //       type: 'item',
    //       url: '/tables/mui-table/basic'
    //     },
    //     {
    //       id: 'mui-dense',
    //       title: <FormattedMessage id="dense" />,
    //       type: 'item',
    //       url: '/tables/mui-table/dense'
    //     },
    //     {
    //       id: 'mui-enhanced',
    //       title: <FormattedMessage id="enhanced" />,
    //       type: 'item',
    //       url: '/tables/mui-table/enhanced'
    //     },
    //     {
    //       id: 'mui-data-table',
    //       title: <FormattedMessage id="datatable" />,
    //       type: 'item',
    //       url: '/tables/mui-table/datatable'
    //     },
    //     {
    //       id: 'mui-custom',
    //       title: <FormattedMessage id="custom" />,
    //       type: 'item',
    //       url: '/tables/mui-table/custom'
    //     },
    //     {
    //       id: 'mui-fixed-header',
    //       title: <FormattedMessage id="fixed-header" />,
    //       type: 'item',
    //       url: '/tables/mui-table/fixed-header'
    //     },
    //     {
    //       id: 'mui-collapse',
    //       title: <FormattedMessage id="collapse" />,
    //       type: 'item',
    //       url: '/tables/mui-table/collapse'
    //     }
    //   ]
    // }
  ]
};

export default formsTables;
