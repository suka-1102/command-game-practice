import { useState } from 'react';
import { gameSetting } from '../settings/gameSetting';

export const battleLogic = () => {

  const {
    damageRange,
    criticalHitRate,
    targetKilledNumber,
    sleepRate,
    potionPrice,
    magicPotionPrice,
    enemies,
    playerStatus
  } = gameSetting

  const [playerData, setPlayerData] = useState(playerStatus)
  
  const [enemyDamage, setEnemyDamage] = useState(0)
  const [enemiesData, setEnemiesData] = useState(enemies)
  const [enemyData, setEnemyData] = useState()
  const [maxEnemyHp, setMaxEnemyHp] = useState()
  const [enemyHp, setEnemyHp] = useState(maxEnemyHp)

  const [victory, setVictory] = useState(false)
  const [defeat, setDefeat] = useState(false)
  const [logs, setLogs] = useState([])

  const [nowKilledNumber, setNowKilledNumber] = useState(0)
  const [modalTitleText, setModalTitleText] = useState("")
  const [clearGame, setClearGame] = useState(false)
  const [enemyHpGaugeColor, setEnemyHpGaugeColor] = useState("")
  const [playerHpGaugeColor, setPlayerHpGaugeColor] = useState("")

  const [plusPoint, setPlusPoint] = useState(0)
  const [modalView, setModalView] = useState()

  const [canPotionBuy, setCanPotionBuy] = useState(false);
  const [canMagicPotionBuy, setCanMagicPotionBuy] = useState(false)
  const [canPotionSell, setCanPotionSell] = useState(true);
  const [canMagicPotionSell, setCanMagicPotionSell] = useState(true)
  const [nextStageButton, setNextStageButton] = useState(false)
  const [stageNumber, setStageNumber] = useState(1)
  
  const [isPoison, setIsPoison] = useState(false)
  const [isSleep, setIsSleep] = useState(false)

  const insertLog = (texts) => {
    setLogs(prev => {
      const newIndex = prev.length + 1
      return [`${newIndex}:${texts}`, ...prev]
    });
  }

  const damageCalculation = (attack, defence) => {
    const maxDamage = attack * (1 + damageRange)
    const minDamage = attack * (1 - damageRange)
    const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage)
    const damage = attackDamage - defence
    if(damage < 1) {
    return 0 
    } else {
      return damage
    }
  }

  const damageProcess = (damage,sleepTrue, sleepFirst ) => {
    let nextEnemyHp = Math.max(0, enemyHp - damage);
    if (nextEnemyHp > 0) {
      setEnemyDamage(damageCalculation(enemyData.attack, playerData.defence))

      if(sleepTrue && !sleepFirst) {
        if(Math.random() < sleepRate) {
          insertLog(`<span style="color:red;"> ${enemyData.name} </span>は眠りから覚めた`)
          setIsSleep(false)
          return
        } 
      } else if(!sleepTrue) {
        
        if(Math.random() < criticalHitRate) {
          setEnemyDamage(prev => prev * 2)
          insertLog(`<span style="color:red;"> ${enemyData.name}</span>の攻撃！クリティカルヒット<span style="color:blue;">${playerData.name} </span>に ${enemyDamage} のダメージ`)
        }else {
          insertLog(`<span style="color:red;"> ${enemyData.name} </span>の攻撃！<span style="color:blue;"> ${playerData.name} </span>に ${enemyDamage} のダメージ`)
        }
      } 
      if (isSleep) {
        setEnemyDamage(0)
        insertLog(`<span style="color:red;"> ${enemyData.name} </span>は眠っている`)
      }

      
      
      if(isPoison) {
        const enemyHpLog = nextEnemyHp
        nextEnemyHp = Math.floor(nextEnemyHp*0.8)
        
        const poisonDamage = enemyHpLog - nextEnemyHp
        setEnemyHp(nextEnemyHp)
        insertLog(`<span style="color:red;"> ${enemyData.name} </span>は毒に侵されている！ ${poisonDamage} のダメージ`)
      }
      const nextPlayerHp = playerData.hp - enemyDamage

      setPlayerData(prev => ({
        ...prev, hp: nextPlayerHp,
      }))

      hpGaugeChangeColor(((nextEnemyHp/maxEnemyHp) * 100), true)
      hpGaugeChangeColor(((nextPlayerHp/playerData.maxPlayerHp) * 100), false)
      if(nextPlayerHp <= 0) {
        setDefeat(true)
        setPlayerData(prev => ({
          ...prev, hp: 0,
        }))
      }
    } else {
      setVictory(true)
      setEnemyHp(0)
    }
  }


  const hpGaugeChangeColor = (gauge, isEnemy) => {
    if(isEnemy) {
      if(gauge <= 25) {
        setEnemyHpGaugeColor("red")
      } else if (gauge <= 50) {
        setEnemyHpGaugeColor("orange")
      }
    } else {
      if(gauge <= 25) {
        setPlayerHpGaugeColor("red")
      } else if(gauge <= 50) {
        setPlayerHpGaugeColor("orange")
      } else {
        setPlayerHpGaugeColor("")
      }
    }
  }  
  

  return {
    enemyData,
    isPoison,
    isSleep,
    enemyHpGaugeColor,
    enemyHp,
    maxEnemyHp,
    enemyDamage,
    playerData,
    playerHpGaugeColor,
    nowKilledNumber,
    logs,
    victory,
    defeat,
    modalView,
    modalTitleText,
    clearGame,
    nextStageButton,
    stageNumber,
    canPotionBuy,
    canMagicPotionBuy,
    canMagicPotionSell,
    potionPrice,
    magicPotionPrice,
    targetKilledNumber,
    enemiesData,
    canPotionSell,
    plusPoint,
    setEnemyData,
    setMaxEnemyHp,
    setCanMagicPotionBuy,
    setCanPotionBuy,
    setCanMagicPotionSell,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
    setVictory,
    setEnemyHpGaugeColor,
    hpGaugeChangeColor,
    setIsPoison,
    setIsSleep,
    setEnemyHp,
    setPlayerData,
    setCanPotionSell,
    setDefeat,
    setPlusPoint,
    setModalTitleText,
    damageProcess,
    damageCalculation,
    insertLog,
    setModalView
  }

}