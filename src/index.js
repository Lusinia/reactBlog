import { Navigation } from 'react-native-navigation';
import { ROUTES } from './constants';
import ShowList from "./views/ShowList";
import SideMenu from './views/SideMenu';
import Settings from './views/Settings';
import Login from './views/Login';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent(ROUTES.SHOW_LIST, () => ShowList, store, Provider);
  Navigation.registerComponent(ROUTES.ASIDE, () => SideMenu, store, Provider);
  Navigation.registerComponent(ROUTES.SETTINGS, () => Settings, store, Provider);
  Navigation.registerComponent(ROUTES.LOGIN, () => Login, store, Provider);
};

export default registerScreens;