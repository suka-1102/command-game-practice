import { useState } from 'react';
import { gameSetting } from '../settings/gameSetting';

export const battleLogic = (

  
) => {

  const {
    damageRange,
    criticalHitRate,
    targetKilledNumber,
    sleepRate,
    potionPrice,
    magicPotionPrice,
    playerStatus
  } = gameSetting

  const [playerData, setPlayerData] = useState(playerStatus)
  const [logs, setLogs] = useState([])

  const [enemyDamage, setEnemyDamage] = useState(0)
  const [enemyData, setEnemyData] = useState()
  const [maxEnemyHp, setMaxEnemyHp] = useState()
  const [enemyHp, setEnemyHp] = useState(maxEnemyHp)

  const [victory, setVictory] = useState(false)
  const [defeat, setDefeat] = useState(false)

  const [modalView, setModalView] = useState()

  const [isPoison, setIsPoison] = useState(false)
  const [isSleep, setIsSleep] = useState(false)


  // const [clearGame, setClearGame] = useState(false)
  // const [stageNumber, setStageNumber] = useState(1)
  // const [nextStageButton, setNextStageButton] = useState(false)
  // const [nowKilledNumber, setNowKilledNumber] = useState(0)
  // const [plusPoint, setPlusPoint] = useState(0)

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

  

  return {
    enemyData,
    isPoison,
    isSleep,
    enemyHp,
    maxEnemyHp,
    enemyDamage,
    playerData,
    logs,
    victory,
    defeat,
    modalView,
    potionPrice,
    magicPotionPrice,
    targetKilledNumber,
    setEnemyData,
    setMaxEnemyHp,
    setVictory,
    setIsPoison,
    setIsSleep,
    setEnemyHp,
    setPlayerData,
    setDefeat,
    damageProcess,
    damageCalculation,
    insertLog,
    setModalView,
    // clearGame,
    // setClearGame,
    // setPlusPoint,
    // setNowKilledNumber,
    // setNextStageButton,
    // stageNumber,
    // plusPoint,
    // nextStageButton,
    // nowKilledNumber,
    // setStageNumber,
  }

}