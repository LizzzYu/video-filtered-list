export const secondFormatter = (secs) => {
  let hr = Math.floor(secs / 3600);
  let min = Math.floor((secs - hr * 3600) / 60);
  let sec = parseInt(secs - hr * 3600 - min * 60);

  while (min.toString().length < 2) {
    min = '0' + min;
  }
  while (sec.toString().length < 2) {
    sec = '0' + sec;
  }
  if (hr) hr += ':';
  return (hr || '') + min + ':' + sec;
};

export const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

