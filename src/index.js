import { Navigation } from 'react-native-navigation';
import ShowList from "./views/ShowList";
import SideMenu from './views/SideMenu';
import Settings from './views/Settings';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('blog.ShowList', () => ShowList, store, Provider);
  Navigation.registerComponent('blog.SideMenu', () => SideMenu, store, Provider);
  Navigation.registerComponent('blog.Settings', () => Settings, store, Provider);
};

export default registerScreens;