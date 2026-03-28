import styles from './PlayerSection.module.scss';
import { gameSetting } from '../../settings/gameSetting';
import useStore from '../../store/stateSettings';

const PlayerSection = ({
  nowKilledNumber,
  logs,
  onAttackClick,
  onFireClick,
  onSetModalView,
}) => {
  const {
    targetKilledNumber,
  } = gameSetting;

  const { victory, defeat, playerData } = useStore() 
  
  
  return (
  
    <section className={styles.player}>
      <h2>{playerData.name}</h2>
      <div className={styles.hpGauge}>
        <div 
          className={`${styles.hpGaugeValue} ${
                      (playerData.hp / playerData.maxPlayerHp) * 100 <= 25 
                        ? styles.red 
                        : (playerData.hp / playerData.maxPlayerHp) * 100 <= 50 
                          ? styles.orange 
                          : ""
                    }`}
          style={{
            width: `${((playerData.hp / playerData.maxPlayerHp) * 100)}%`
          }}
        >
        </div>
      </div>
      <div className={styles.hp}>
        <div>{playerData.hp}</div>
        <div className={styles.maxPlayerHp}>{playerData.maxPlayerHp}</div>
      </div>

      <div className={styles.hpGauge}>
        <div className={styles.mpGaugeValue} style={{
          width: `${((playerData.mp / playerData.maxPlayerMp) * 100)}%`
        }}>
        </div>
      </div>
      <div className={styles.mp}>
        <div>{playerData.mp}</div>
        <div className={styles.maxPlayerMp}>{playerData.maxPlayerMp}</div>
      </div>

      <div className={styles.playerStatus}>
        <div className={styles.killedNumbers}>
          討伐数:
          <div>{nowKilledNumber}</div>
          <div>{targetKilledNumber}</div>
        </div>
      </div>
      <ul className={styles.playerStatus}>
        <li className={styles.playerLevel}>
          レベル: {playerData.nowLevel} 
        </li>
        <li className={styles.playerMoney}>
          所持金: {playerData.nowHaveMoney} ¥
        </li>
      </ul>
      <ul className={styles.logs}>
        {logs.map((text, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: text }}></li>
        ))}
      </ul>

      <ul className={styles.attackButtonSelect}>
        <li>
          <button className={`${styles.attack} ${(victory || defeat) ? styles.deactive : ''}`} onClick={onAttackClick}>攻撃する</button>
        </li>
        <li>
          <button className={`${styles.fire} ${((victory || defeat) || !playerData.canFire) ? styles.deactive : ''}`} onClick={onFireClick}>ファイア</button>
        </li>
        <li>
          <button className={`${styles.skill} ${(victory || defeat) ? styles.deactive : ''}`} onClick={() => onSetModalView('skill')}>スキル</button>
        </li>
        <li>
          <button className={`${styles.item} ${(victory || defeat) ? styles.deactive : ''}`} onClick={() => onSetModalView('item')}>アイテム</button>
        </li>
      </ul> 
    </section>
  )
}

export default PlayerSection;