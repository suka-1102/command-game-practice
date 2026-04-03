import { create } from "zustand";
import { gameSetting } from "../settings/gameSetting";


export const damageCalculation = (attack, defence) => {
  const maxDamage = attack * (1 + gameSetting.damageRange)
  const minDamage = attack * (1 - gameSetting.damageRange)
  const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage)
  const damage = attackDamage - defence
  if(damage < 1) {
  return 0 
  } else {
    return damage
  }
}

const useStore = create((set, get) => ({

  playerData:gameSetting.playerStatus,
  setPlayerData: (updater) => 
    set((state) => ({
      playerData: updater(state.playerData) 
    })),

  maxEnemyHp: undefined, 
  setMaxEnemyHp: (newHp) => set({ maxEnemyHp: newHp }),

  enemyData: undefined,
  setEnemyData: (newEnemyData) => set({ enemyData: newEnemyData }),


  enemyHp: undefined,
  setEnemyHp: (newEnemyHp) => set({enemyHp: newEnemyHp}),

  victory: false,
  setVictory: (status) => set({ victory: status }),

  defeat: false,
  setDefeat: (status) => set({ defeat: status}),

  clearGame: false,
  setClearGame: (status) => set({ clearGame: status}),

  isSleep: false,
  setIsSleep: (v) => set({ isSleep: v }),

  isPoison: false,
  setIsPoison: (v) => set({ isPoison: v }),

  stageNumber: 1,
  setStageNumber: (number) => set({ stageNumber: number }),

  nowKilledNumber: 0,
  setNowKilledNumber: (number) => set({ nowKilledNumber: number }),

  nextStageButton: false,
  setNextStageButton: (status) => set({ nextStageButton: status }),


  enemyDamage: 0,
  setEnemyDamage: (damage) => set({ enemyDamage: damage }),

  modalView: 0,
  setModalView: (damage) => set({ modalView: damage }),

  logs: [],
  insertLog: (text) => set((state) => {
    const newIndex = state.logs.length + 1;
    return { logs: [`${newIndex}:${text}`, ...state.logs] };
  }),


  damageProcess: (damage,sleepTrue, sleepFirst ) => {

    const {
      enemyHp, enemyData, playerData,
      enemyDamage,
      isPoison, isSleep,
      insertLog, setEnemyDamage, setEnemyHp, setPlayerData, setDefeat, setVictory, setIsSleep,
    } = get();
    let nextEnemyHp = Math.max(0, enemyHp - damage);
    if (enemyHp > 0) {
      setEnemyDamage(damageCalculation(enemyData.attack, playerData.defence))
      const enemyDamageLog = damageCalculation(enemyData.attack, playerData.defence) * 2;

      if(sleepTrue && !sleepFirst) {
        if(Math.random() < gameSetting.sleepRate) {
          insertLog(`<span style="color:red;"> ${enemyData.name} </span>は眠りから覚めた`)
          setIsSleep(false)
          return
        } 
      } else if(!sleepTrue) {
        
        if(Math.random() < gameSetting.criticalHitRate) {
          setEnemyDamage(enemyDamageLog)
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
        const enemyHpLog = enemyHp
        nextEnemyHp = Math.floor(enemyHp*0.8)
        
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
}));

export default useStore;