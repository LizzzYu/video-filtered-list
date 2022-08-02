import styles from './button.module.scss';

export default function Button(props) {
  return (
    <div
      onClick={props.onClick}
      className={`${styles.wrapper} ${props.isActive ? styles.checked : ''}`}>
      <p>{props.label}</p>
    </div>
  );
}
