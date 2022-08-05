import { useEffect, useState } from 'react';
// import moment from 'moment';
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

  useEffect(() => {
    if (videos.length !== 0) {
      switch (selectedOrder) {
        case 1:
          setVideos([
            ...videos.sort((a, b) =>
              b.publishedAt.localeCompare(a.publishedAt)
            ),
          ]);

          break;
        case 2:
          setVideos([...videos.sort((a, b) => b.views - a.views)]);

          break;
        case 3:
          setVideos([
            ...videos.sort((a, b) => b.collectCount - a.collectCount),
          ]);

          break;
        default:
          setVideos([
            ...videos.sort((a, b) =>
              b.publishedAt.localeCompare(a.publishedAt)
            ),
          ]);
      }
    }
  }, [selectedOrder]);

  useEffect(() => {
    const originVideos = [...rawData];
    if (originVideos.length !== 0) {
      switch (selectedLength) {
        case 1:
          setVideos(originVideos);

          break;
        case 2:
          setVideos([...originVideos.filter((video) => video.duration <= 300)]);

          break;
        case 3:
          setVideos([
            ...originVideos.filter(
              (video) => video.duration <= 600 && video.duration >= 300
            ),
          ]);

          break;
        case 4:
          setVideos([...originVideos.filter((video) => video.duration > 600)]);

          break;
        default:
          setVideos(rawData);
      }
    }
  }, [selectedLength]);

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
