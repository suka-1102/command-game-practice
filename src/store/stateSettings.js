import { create } from "zustand";

const useStore = create((set) => ({
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