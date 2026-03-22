import { gameSetting } from "../settings/gameSetting";

export const Buttons = ({
  damageCalculation,
  insertLog,
  setEnemyHp,
  damageProcess,
  isSleep,
  setIsSleep,
  enemyHp,
  setPlayerData,
  playerData,
  enemyData,
  enemyDamage,
  setVictory,
  setDefeat,
  setIsPoison,
  setModalView,
  setEnemyData,
  setMaxEnemyHp,
  enemiesData,
  stageNumber,
  setStageNumber,
  setNowKilledNumber,
  setClearGame,
  setNextStageButton,
}) => {

  const {
    criticalHitRate,
    magicPotionPrice,
    potionPrice,
    } = gameSetting

  const attackClick = () => {
    let playerDamage = damageCalculation(playerData.attack, enemyData.defence)
    if(Math.random() < criticalHitRate) {
      playerDamage *= 2;
      insertLog(`<span style="color:blue;"> ${playerData.name} </span>の攻撃！クリティカルヒット！<span style="color:red;"> ${enemyData.name} </span>に ${playerDamage} のダメージ`)
    }else {
      insertLog(`<span style="color:blue;"> ${playerData.name}</span>の攻撃！<span style="color:red;"> ${enemyData.name} </span>に ${playerDamage} のダメージ`)
    }
    setEnemyHp(enemyHp - playerDamage)
    damageProcess(playerDamage,isSleep)
  }

  const fireClick = () => {
    insertLog(`<span style="color:blue;"> ${playerData.name}</span>のファイア！<span style="color:red;"> ${enemyData.name} </span>に ${playerData.fireDamage} のダメージ`)
    setEnemyHp(enemyHp - playerData.fireDamage)
    damageProcess(playerData.fireDamage, isSleep)
    setPlayerData(prev => ({
      ...prev, mp: prev.mp -5,
    }))

    const nowPlayerMp = playerData.mp - 5
    if(nowPlayerMp < 5) {

      setPlayerData(prev => (
        {...prev, canFire: false}
      ))
    }
  }

  const potionClick = () => {
    let newPlayerHp = playerData.hp + 50
    
    if(newPlayerHp > playerData.maxPlayerHp) {
      setPlayerData(prev => ({
        ...prev, hp: playerData.maxPlayerHp,
      }))
      newPlayerHp = playerData.maxPlayerHp
    } else {
      setPlayerData(prev => ({
        ...prev, hp: prev.hp + 50,
      }))
    }

    damageProcess(0, isSleep)
    newPlayerHp = newPlayerHp - enemyDamage
    setPlayerData(prev => ({
      ...prev, hp: newPlayerHp,
    }))
    
    const nowHavePotionIndex = playerData.nowHavePotion - 1

    setPlayerData(prev => (
      {...prev, nowHavePotion: prev.nowHavePotion -1}
    ))
    if(nowHavePotionIndex <= 0) {

      setPlayerData(prev => (
        {...prev, canUsePotion: false}
      ))
    }

    if(newPlayerHp <= 0){
      setDefeat(true)
      setPlayerData(prev => ({
        ...prev, hp:0,
      }))
    }
  }

  const magicpotionClick = () => {
    let newPlayerMp = playerData.mp + 20
    let newPlayerHp = playerData.hp
    if(newPlayerMp > playerData.maxPlayerMp) {
      setPlayerData(prev => ({
        ...prev, mp: playerData.maxPlayerMp,
      }))
      newPlayerMp = playerData.maxPlayerMp
    } else {
      setPlayerData(prev => ({
        ...prev, mp: prev.mp + 20,
      }))
    }
    if(newPlayerMp >= 5) {
      setPlayerData(prev => (
        {...prev, canFire: true}
      ))
      
    }
 
    damageProcess(0)
    newPlayerHp = newPlayerHp - enemyDamage
    setPlayerData(prev => ({
      ...prev, hp:newPlayerHp ,
    }))
    
    
    const nowHaveMagicPotionIndex = playerData.nowHaveMagicPotion - 1

    setPlayerData(prev => (
      {...prev, nowHaveMagicPotion: prev.nowHaveMagicPotion - 1}
    ))
    if(nowHaveMagicPotionIndex <= 0) {

      setPlayerData(prev => ({
        ...prev, canUseMagicPotion: false,
      }))
    }

    if(newPlayerHp <= 0){
      setDefeat(true)
      setPlayerData(prev => ({
        ...prev, hp:0 ,
      }))
    }
  }
  

  const poisonClick = () => {

    damageProcess(0,isSleep)
    const newPlayerHp = playerData.hp - enemyDamage
    setPlayerData(prev => ({
      ...prev, hp:newPlayerHp ,
    }))
    setIsPoison(true)
    setModalView('skill')
  }

  const sleepClick = () => {
    setIsSleep(true)
    insertLog(`<span style="color:red;"> ${enemyData.name} </span>は眠りについた`)

    damageProcess(0, true, true)
    
    setModalView('')
  }

    const magicPotionBuyClick = () => {
    const nowHaveMoneyLog = playerData.nowHaveMoney - magicPotionPrice;

    setPlayerData(prev => ({
      ...prev, 
      nowHaveMoney: prev.nowHaveMoney - magicPotionPrice,
      nowHaveMagicPotion: prev.nowHaveMagicPotion + 1,
      canUseMagicPotion:true,
    }
    ))

  }

  const modalNextButtonClick = () => {
    const newEnemiesData = enemiesData.filter(enemy => enemy.enemyStageNumber === stageNumber)
    const nextEnemy = newEnemiesData[Math.floor(Math.random() * newEnemiesData.length)]
    setEnemyData(nextEnemy)
    setMaxEnemyHp(nextEnemy.hp)
    setVictory(false)
    setEnemyHp(nextEnemy.hp)
  }

    const potionBuyClick = () => {
    const nowHaveMoneyLog = playerData.nowHaveMoney - potionPrice

    setPlayerData(prev => ({
      ...prev, 
      nowHaveMoney: prev.nowHaveMoney - potionPrice,
      nowHavePotion: prev.nowHavePotion + 1,
      canUsePotion: true,
    }
    ))

  }


  const potionSellClick = () =>  {
    const nowHavePotionIndex = playerData.nowHavePotion - 1;
    const nowHaveMoneyLog = playerData.nowHaveMoney + (potionPrice / 2)

    setPlayerData(prev => ({
      ...prev, 
      nowHaveMoney: prev.nowHaveMoney + (potionPrice / 2),
      nowHavePotion: prev.nowHavePotion - 1
    }))


  }

    const magicPotionSellClick = () => {
    const nowHaveMagicPotionIndex = playerData.nowHaveMagicPotion - 1;
    const nowHaveMoneyLog = playerData.nowHaveMoney + (magicPotionPrice / 2)

    setPlayerData(prev => (
      {...prev, 
        nowHaveMoney: prev.nowHaveMoney + (magicPotionPrice / 2),
        nowHaveMagicPotion: prev.nowHaveMagicPotion - 1
      }
    ))

  }
  

  const modalNextStageClick = () => {
    setStageNumber(prev => prev + 1)
    setNowKilledNumber(0)
    const newStageNumber = stageNumber + 1;

    const newEnemiesData = enemiesData.filter(enemy => enemy.enemyStageNumber === newStageNumber)
    const nextEnemy = newEnemiesData[Math.floor(Math.random() * newEnemiesData.length)]
    setEnemyData(nextEnemy)
    setMaxEnemyHp(nextEnemy.hp)
    setEnemyHp(nextEnemy.hp)
 
    setVictory(false)
    setClearGame(false)
    setNextStageButton(false)
  }




  return {
    attackClick,
    fireClick,
    potionClick,
    poisonClick,
    sleepClick,
    magicPotionBuyClick,
    magicpotionClick,
    modalNextButtonClick,
    potionBuyClick,
    potionSellClick,
    magicPotionSellClick,
    modalNextStageClick,
  }

}