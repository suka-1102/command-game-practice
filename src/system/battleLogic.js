import { useState } from 'react';
import { gameSetting } from '../settings/gameSetting';

export const battleLogic = ({
  playerData,
  enemyData,
  setPlayerData,
  setDefeat,
  setVictory,
  enemyHp,
  setEnemyHp,
}) => {

  const {
    damageRange,
    criticalHitRate,
    sleepRate,
  } = gameSetting

  const [logs, setLogs] = useState([])

  const [enemyDamage, setEnemyDamage] = useState(0)

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
    isPoison,
    isSleep,
    enemyDamage,
    logs,
    setIsPoison,
    setIsSleep,
    damageProcess,
    damageCalculation,
    insertLog,
    // enemyHp,
    // maxEnemyHp,
    // setMaxEnemyHp,
    // playerData,
    // setEnemyHp,
    // enemyData,
    // setPlayerData,
    // setDefeat,
    // defeat,
    // setEnemyData,
    // victory,
    // setVictory,
    // potionPrice,
    // magicPotionPrice,
    // targetKilledNumber,
    // modalView,
    // setModalView,
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