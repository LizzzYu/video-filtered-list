export const setPublishOrder = (data) => {
  return data.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
};

export const setViewsCountOrder = (data) => {
  return data.sort((a, b) => b.views - a.views);
};

export const setCollectCountOrder = (data) => {
  return data.sort((a, b) => b.collectCount - a.collectCount);
};