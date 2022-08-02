import Button from '../../Button';
import styles from './filterHeader.module.scss';

export default function FilterHeader(props) {
  return (
    <>
      <p className={styles.title}>{props.label}</p>
      {props.tabs.map((tab) => (
        <Button
          key={tab.id}
          label={tab.label}
          onClick={() => props.onOrderClick(tab.id)}
          isActive={props.selectedOrder === tab.id}
        />
      ))}
    </>
  );
}
