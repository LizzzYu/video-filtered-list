import { useEffect, useState } from 'react';
import styles from './filter.module.scss';
import CardsContainer from '../CardsContainer';
import FilterHeader from './FilterHeader/FilterHeader';
import {
  orderFilterConfig,
  lengthFilterConfig,
} from '../../statics/filterMenu';

export default function Filter(props) {
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [selectedLength, setSelectedLength] = useState(1);

  const [rawData, setRawData] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(props.videos.data);
    setRawData(props.videos.data);
  }, [props.videos]);


  const onOrderClick = (id) => {
    setSelectedOrder(id);
  };

  const onLengthClick = (id) => {
    setSelectedLength(id);
  };

  const onPublishOrder = (data) => {
    return data.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  };

  const onViewsCountOrder = (data) => {
    return data.sort((a, b) => b.views - a.views);
  };

  const onCollectCountOrder = (data) => {
    return data.sort((a, b) => b.collectCount - a.collectCount);
  };

  const getOrder = (order, data) => {
    switch (order) {
      case 1:
        setVideos(onPublishOrder(data));

        break;
      case 2:
        setVideos(onViewsCountOrder(data));

        break;
      case 3:
        setVideos(onCollectCountOrder(data));

        break;
      default:
        setVideos(onPublishOrder(data));
    }
  };

  useEffect(() => {
    let originVideos = [...rawData];
    if (originVideos.length !== 0) {
      switch (selectedLength) {
        case 1:
          getOrder(selectedOrder, originVideos);

          break;
        case 2:
          originVideos = originVideos.filter((video) => video.duration <= 300);
          getOrder(selectedOrder, originVideos);

          break;
        case 3:
          originVideos = originVideos.filter(
              (video) => video.duration <= 600 && video.duration >= 300
            );
          getOrder(selectedOrder, originVideos);

          break;
        case 4:
          originVideos = originVideos.filter((video) => video.duration > 600);
          getOrder(selectedOrder, originVideos);

          break;
        default:
          getOrder(selectedOrder, originVideos);
          break;
      }
    }
  }, [selectedLength, selectedOrder]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header__order}>
          <FilterHeader
            label="排序"
            tabs={orderFilterConfig}
            onOrderClick={onOrderClick}
            selectedOrder={selectedOrder}
          />
        </div>
        <div className={styles.header__order}>
          <FilterHeader
            label="長度"
            tabs={lengthFilterConfig}
            onOrderClick={onLengthClick}
            selectedOrder={selectedLength}
          />
        </div>
      </div>
      <CardsContainer videos={videos} />
    </div>
  );
}
