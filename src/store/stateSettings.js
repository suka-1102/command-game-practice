import { create } from "zustand";

const useMaxEnemyHpStore = create((set) => ({
  maxEnemyHp: undefined, 

  setMaxEnemyHp: (newHp) => set({ maxEnemyHp: newHp }),
}));

export default useMaxEnemyHpStore;