export const getLangText = (lang) => {
  switch (lang) {
    case 'cht':
      return '中文';
    case 'ja':
      return '日文';
    case 'vi':
      return '越南文';
    case 'en':
      return '英文';
  }
};

export const getLevelText = (level) => {
  switch (level) {
    case 1:
      return '初級';
    case 2:
      return '中級';
    case 3:
      return '中高級';
    case 4:
      return '高級';
  }
};