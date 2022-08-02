import styles from './card.module.scss';
import Image from 'next/image';
import headsetLogo from '../../assets/image/headset_black.svg';
import { formatSecond } from '../../utils/formatter';

export default function Card(props) {
  const langSwitcher = (lang) => {
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

  const levelSwitcher = (level) => {
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

  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img className={styles.image} src={props.thumbnail} />
      </div>
      <div className={styles.durationTag}>{formatSecond(props.duration)}</div>
      <div className={styles.contents}>
        <div className={styles.contents__title}>{props.title}</div>
        <div className={styles.contents__viewsSec}>
          <Image src={headsetLogo} width={19} height={19} alt="headset Logo" />
          <p className={styles.contents__viewsSec__views}>
            {formatter.format(props.views)}
          </p>
        </div>
        <div className={styles.contents__tagGroup}>
          {props.captions.map((caption) => (
            <div
              key={caption}
              className={`${styles.contents__tagGroup__tag} ${styles.language}`}>
              {langSwitcher(caption)}
            </div>
          ))}
          <div className={`${styles.contents__tagGroup__tag} ${styles.level}`}>
            {levelSwitcher(props.level)}
          </div>
        </div>
      </div>
    </div>
  );
}
