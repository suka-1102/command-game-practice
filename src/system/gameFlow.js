import { useState, useEffect } from 'react';
import { gameSetting } from '../settings/gameSetting';
import useStore from '../store/stateSettings';

export const gameFlow = ({
  // enemyData,
  playerData,
  // setEnemyData,
  setEnemyHp,
  setIsPoison,
  setIsSleep,
  setPlayerData,
}) => {

  const { setMaxEnemyHp, victory, defeat,enemyData, setEnemyData, } = useStore()
  const {
    firstNeedLevelUpPoint,
    targetKilledNumber,
    stageNumberIndex,
    enemies,
  } = gameSetting;

  const [plusPoint, setPlusPoint] = useState(0)
  const [modalTitleText, setModalTitleText] = useState("")
  const [nowKilledNumber, setNowKilledNumber] = useState(0)
  const [nextStageButton, setNextStageButton] = useState(false)
  const [stageNumber, setStageNumber] = useState(1)
  const [clearGame, setClearGame] = useState(false);
  

  useEffect(() => {
    const enemiesDataFilter = enemies.filter(enemy => enemy.enemyStageNumber === 1)
    const enemyDataFirst = enemiesDataFilter[Math.floor(Math.random() * enemiesDataFilter.length)]

    setEnemyData(enemyDataFirst)
    setMaxEnemyHp(enemyDataFirst.hp)
    setEnemyHp(enemyDataFirst.hp)
  }, [])

  useEffect(() => {
    if(victory) {

      const nowKilledNumberDefine = nowKilledNumber + 1
      setNowKilledNumber(nowKilledNumberDefine)
      setIsPoison(false)
      setIsSleep(false)
      // status
      const nowHaveMoneyIndex = playerData.nowHaveMoney + enemyData.money

      const getExperiencePoint = enemyData.experiencePoint
      setPlayerData(prev => ({
        ...prev, 
        nowHaveMoney: prev.nowHaveMoney + enemyData.money,
        nowHaveExperiencePoint: prev.nowHaveExperiencePoint + getExperiencePoint,
      }))
      
      const needLevelUpPoint = firstNeedLevelUpPoint + plusPoint;
      // level up
      const newPlayerHaveExperiencePoint = playerData.nowHaveExperiencePoint + enemyData.experiencePoint;
      if(newPlayerHaveExperiencePoint >= needLevelUpPoint) {
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

  return { 
    modalTitleText,
    nowKilledNumber,
    nextStageButton,
    stageNumber,
    clearGame,
    setClearGame,
    setStageNumber,
    setNextStageButton,
    setNowKilledNumber,

   }
}