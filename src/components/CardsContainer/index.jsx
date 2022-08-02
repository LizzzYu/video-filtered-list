import styles from './cardsContainer.module.scss';
import Card from './Card';

export default function CardsContainer(props) {
  return (
    <div className={styles.wrapper}>
      {props.videos.length ? (
        props.videos.map((video) => (
          <Card
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            views={video.views}
            captions={video.captions}
            level={video.level}
            duration={video.duration}
          />
        ))
      ) : (
        <p className={styles.text}>沒有篩選結果</p>
      )}
    </div>
  );
}
