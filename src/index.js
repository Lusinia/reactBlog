import { Navigation } from 'react-native-navigation';
import ShowList from "./views/ShowList";

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('blog.ShowList', () => ShowList, store, Provider);
};

export default registerScreens;