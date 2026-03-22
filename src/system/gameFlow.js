import { useEffect } from 'react';
import { gameSetting } from '../settings/gameSetting';

export const gameFlow = ({
  enemiesData,
  enemyData,
  playerData,
  victory,
  defeat,
  nowKilledNumber,
  plusPoint,
  stageNumber,
  setEnemyData,
  setMaxEnemyHp,
  setEnemyHp,
  setNowKilledNumber,
  setEnemyHpGaugeColor,
  setIsPoison,
  setIsSleep,
  setCanPotionBuy,
  setCanMagicPotionBuy,
  setPlayerData,
  setPlusPoint,
  setClearGame,
  setModalTitleText,
  setNextStageButton,
}) => {
  const {
    firstNeedLevelUpPoint,
    targetKilledNumber,
    stageNumberIndex,
  } = gameSetting;

  useEffect(() => {
    const enemiesDataFilter = enemiesData.filter(enemy => enemy.enemyStageNumber === 1)
    const enemyDataFirst = enemiesData[Math.floor(Math.random() * enemiesDataFilter.length)]

    setEnemyData(enemyDataFirst)
    setMaxEnemyHp(enemyDataFirst.hp)
    setEnemyHp(enemyDataFirst.hp)
  }, [])

  useEffect(() => {
    if(victory) {

      const nowKilledNumberDefine = nowKilledNumber + 1
      setNowKilledNumber(nowKilledNumberDefine)
      setEnemyHpGaugeColor("")
      setIsPoison(false)
      setIsSleep(false)
      // status
      const nowHaveMoneyIndex = playerData.nowHaveMoney + enemyData.money
      if(nowHaveMoneyIndex >= 30) {
        setCanPotionBuy(true)
        if(nowHaveMoneyIndex >= 50) {
          setCanMagicPotionBuy(true)
        }
      } 
      const getExperiencePoint = enemyData.experiencePoint
      setPlayerData(prev => ({
        ...prev, 
        nowHaveMoney: prev.nowHaveMoney + enemyData.money,
        nowHaveExperiencePoint: prev.nowHaveExperiencePoint + getExperiencePoint,
      }))
      
      const needLevelUpPoint = firstNeedLevelUpPoint + plusPoint;
      // level up
      if(playerData.nowHaveExperiencePoint >= needLevelUpPoint) {
        const levelUpLog = playerData.nowLevel + 1;
        setPlayerData(prev => ({
          ...prev, 
          nowLevel: prev.nowLevel + 1,
          maxPlayerHp: prev.maxPlayerHp + 2,
          maxPlayerMp: prev.maxPlayerMp + 2,
          attack: prev.attack + 2,
          defence: prev.defence + 2
        }))
        setPlusPoint(prev => prev + (playerData.nowLevel * 20))
        

        if(levelUpLog === 2) {
          setPlayerData(prev => ({
            ...prev, canUsePoison: true,
          }))
        } 
        if(levelUpLog === 3) {
          setPlayerData(prev => ({
            ...prev, canUseSleep: true,
          }))
        }
      }
      
   
      if(nowKilledNumberDefine === targetKilledNumber) {
        setClearGame(true)
        setModalTitleText(`おめでとう！ ステージ${stageNumber}！をクリア！`)
        setNextStageButton(true)
        const stageNumberLog = stageNumber;
        if(stageNumberLog === stageNumberIndex) {
           setModalTitleText(`おめでとう！すべてのゲームをクリアしたよ！`)
           setNextStageButton(false)
        }
      } else {
        setModalTitleText(`${enemyData.name}に勝った`)
      }
    }
  }, [victory])

  useEffect(() => {
    if(defeat) {
      setModalTitleText(`${enemyData.name}に負けた`)
    }
  },[defeat])

}