import { useEffect, useState } from 'react';
// import moment from 'moment';
import styles from './filter.module.scss';
import CardsContainer from '../CardsContainer';
import FilterHeader from './FilterHeader/FilterHeader';

const orderFilterConfig = [
  { id: 1, label: '發布時間' },
  { id: 2, label: '觀看次數' },
  { id: 3, label: '收藏次數' },
];

const lengthFilterConfig = [
  { id: 1, label: '不限' },
  { id: 2, label: '4分鐘以下' },
  { id: 3, label: '5 - 10 分鐘' },
  { id: 4, label: '超過 10 分鐘' },
];

export default function Filter() {
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [selectedLength, setSelectedLength] = useState(1);
  const [rawData, setRawData] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(
      'https://us-central1-lithe-window-713.cloudfunctions.net/frontendQuiz'
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.data);
        setRawData(data.data);
      });
  }, []);

  const onOrderClick = (id) => {
    setSelectedOrder(id);
  };

  const onLengthClick = (id) => {
    setSelectedLength(id);
  };

  useEffect(() => {
    switch (selectedOrder) {
      case 1:
        setVideos([
          ...videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
        ]);

        break;
      case 2:
        setVideos([...videos.sort((a, b) => b.views - a.views)]);

        break;
      case 3:
        setVideos([...videos.sort((a, b) => b.collectCount - a.collectCount)]);

        break;
      default:
        setVideos([
          ...videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
        ]);
    }
  }, [selectedOrder]);

  useEffect(() => {
    const originVideos = [...rawData];
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
      default:
        setVideos([
          ...originVideos.filter(video => video.duration > 600)
        ]);
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
