import { create } from "zustand";
import { gameSetting } from "../settings/gameSetting";

  const {
    playerStatus
  } = gameSetting

const useStore = create((set) => ({

  playerData:playerStatus,
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

}));

export default useStore;