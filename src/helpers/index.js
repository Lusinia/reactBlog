import moment from 'moment/moment';

export const toggleDrawer = (navigator, side = 'right', to = 'open') => {
  navigator.toggleDrawer({
    side,
    animated: true,
    to
  });
};

export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) {
    return '0 B';
  }
  const k = 1000;
  const dm = decimals + 1 || 3;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const randomDate = () => {
  return moment(moment().unix() - Math.floor(Math.random()*1000000000)).format('MMM DD, HH:hh');
};


