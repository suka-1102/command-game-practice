import styles from './EnemySection.module.scss';

const EnemySection = ({
  enemyData,
  isPoison,
  isSleep,
  enemyHpGaugeColor,
  enemyHp,
  maxEnemyHp,
}) => {

  return (
    <section className={styles.enemy}>
      <h2 className={styles.enemyStatus}>{enemyData.name} 
        <span className={`${styles.isPoison} ${(!isPoison) ? styles.none : ""}`}>☠（毒）</span>
        <span className={`${styles.isSleep} ${(!isSleep) ? styles.none : ""}`}>😴（眠り）</span>
      </h2>
      <div className={styles.hpGauge}>
        <div 
          className={`${styles.hpGaugeValue} ${styles[enemyHpGaugeColor]}`} 
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