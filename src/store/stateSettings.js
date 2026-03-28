import { create } from "zustand";
// import { gameSetting } from "../settings/gameSetting";

// const {
//   playerStatus
// } = gameSetting
const useStore = create((set) => ({
  maxEnemyHp: undefined, 
  setMaxEnemyHp: (newHp) => set({ maxEnemyHp: newHp }),

  enemyData: undefined,
  setEnemyData: (newEnemyData) => set({ enemyData: newEnemyData }),

  // playerData: playerStatus,
  // setPlayerData: (newPlayerData) => set({ playerData: newPlayerData}),

  victory: false,
  setVictory: (status) => set({ victory: status }),

  defeat: false,
  setDefeat: (status) => set({ defeat: status}),

}));

export default useStore;