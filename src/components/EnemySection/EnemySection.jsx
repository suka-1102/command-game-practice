import styles from './EnemySection.module.scss';
import useStore from '../../store/stateSettings';

const EnemySection = ({
  isPoison,
  isSleep,
}) => {
  const { maxEnemyHp, enemyData, enemyHp } = useStore()
  


  return (
    <section className={styles.enemy}>
      <h2 className={styles.enemyStatus}>{enemyData.name} 
        <span className={`${styles.isPoison} ${(!isPoison) ? styles.none : ""}`}>☠（毒）</span>
        <span className={`${styles.isSleep} ${(!isSleep) ? styles.none : ""}`}>😴（眠り）</span>
      </h2>
      <div className={styles.hpGauge}>
        <div 
          className={`${styles.hpGaugeValue} ${
            (enemyHp / maxEnemyHp) * 100 <= 25 
              ? styles.red 
              : (enemyHp / maxEnemyHp) * 100 <= 50 
                ? styles.orange 
                : ""
          }`}
          style={{
            width: `${((enemyHp / maxEnemyHp) * 100)}%`
          }}
        ></div>
      </div>
      <div className={styles.hp}>
        <div>{enemyHp}</div>
        <div className={styles.maxEnemyHp}>{maxEnemyHp}</div>
      </div>
    </section>
  )
}

export default EnemySection;