import { gameSetting } from "../settings/gameSetting";
import useStore from "../store/stateSettings";

export const ModalButtons = () => {

  const { 
    setVictory, setClearGame,
    setEnemyData, setEnemyHp, setMaxEnemyHp, 
    setPlayerData,
    stageNumber, setStageNumber, setNowKilledNumber, setNextStageButton
  } = useStore()


  const magicPotionBuyClick = () => {

    setPlayerData(prev => ({
      ...prev, 
      nowHaveMoney: prev.nowHaveMoney - gameSetting.magicPotionPrice,
      nowHaveMagicPotion: prev.nowHaveMagicPotion + 1,
      canUseMagicPotion:true,
    }
    ))

  }

  const modalNextButtonClick = () => {
    const newEnemiesData = gameSetting.enemies.filter(enemy => enemy.enemyStageNumber === stageNumber)
    const nextEnemy = newEnemiesData[Math.floor(Math.random() * newEnemiesData.length)]
    setEnemyData(nextEnemy)
    setMaxEnemyHp(nextEnemy.hp)
    setVictory(false)
    setEnemyHp(nextEnemy.hp)
  }

  const potionBuyClick = () => {

    setPlayerData(prev => ({
      ...prev, 
      nowHaveMoney: prev.nowHaveMoney - gameSetting.potionPrice,
      nowHavePotion: prev.nowHavePotion + 1,
      canUsePotion: true,
    }))

  }


  const potionSellClick = () =>  {

    setPlayerData(prev => ({
      ...prev, 
      nowHaveMoney: prev.nowHaveMoney + (gameSetting.potionPrice / 2),
      nowHavePotion: prev.nowHavePotion - 1
    }))


  }

    const magicPotionSellClick = () => {

    setPlayerData(prev => (
      {...prev, 
        nowHaveMoney: prev.nowHaveMoney + (gameSetting.magicPotionPrice / 2),
        nowHaveMagicPotion: prev.nowHaveMagicPotion - 1
      }
    ))

  }
  

  const modalNextStageClick = () => {
    const newStageNumber = stageNumber + 1;
    setStageNumber(newStageNumber)
    setNowKilledNumber(0)


    const newEnemiesData = gameSetting.enemies.filter(enemy => enemy.enemyStageNumber === newStageNumber)
    const nextEnemy = newEnemiesData[Math.floor(Math.random() * newEnemiesData.length)]
    setEnemyData(nextEnemy)
    setMaxEnemyHp(nextEnemy.hp)
    setEnemyHp(nextEnemy.hp)
 
    setVictory(false)
    setClearGame(false)
    setNextStageButton(false)
  }




  return {
    magicPotionBuyClick,
    modalNextButtonClick,
    potionBuyClick,
    potionSellClick,
    magicPotionSellClick,
    modalNextStageClick,
  }

}