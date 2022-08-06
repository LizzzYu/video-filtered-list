import styles from './card.module.scss';
import Image from 'next/image';
import headsetLogo from '../../assets/image/headset_black.svg';
import { secondFormatter, numberFormatter } from '../../utils/formatter';
import { getLangText, getLevelText } from '../../utils/textTranslator';

export default function Card(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image
          objectFit="cover"
          width={240}
          height={135}
          src={props.thumbnail}
        />
      </div>
      <div className={styles.durationTag}>{secondFormatter(props.duration)}</div>
      <div className={styles.contents}>
        <div className={styles.contents__title}>{props.title}</div>
        <div className={styles.contents__viewsSec}>
          <Image src={headsetLogo} width={19} height={19} alt="headset Logo" />
          <p className={styles.contents__viewsSec__views}>
            {numberFormatter.format(props.views)}
          </p>
        </div>
        <div className={styles.contents__tagGroup}>
          {props.captions.map((caption) => (
            <div
              key={caption}
              className={`${styles.contents__tagGroup__tag} ${styles.language}`}>
              {getLangText(caption)}
            </div>
          ))}
          <div className={`${styles.contents__tagGroup__tag} ${styles.level}`}>
            {getLevelText(props.level)}
          </div>
        </div>
      </div>
    </div>
  );
}
