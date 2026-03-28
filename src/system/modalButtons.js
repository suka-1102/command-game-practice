import { gameSetting } from "../settings/gameSetting";
import useMaxEnemyHpStore from "../store/stateSettings";

export const ModalButtons = ({
  // insertLog,
  // damageProcess,
  // isSleep,
  // setIsSleep,
  // enemyData,
  // enemyDamage,
  // setIsPoison,
  // setModalView,
  // enemyHp,
  // setDefeat,
  setEnemyHp,
  setPlayerData,
  playerData,
  setVictory,
  setEnemyData,
  // setMaxEnemyHp,
  stageNumber,
  setStageNumber,
  setNowKilledNumber,
  setClearGame,
  setNextStageButton,
}) => {

  const { setMaxEnemyHp } = useMaxEnemyHpStore()

  const {
    // criticalHitRate,
    magicPotionPrice,
    potionPrice,
    enemies,
  } = gameSetting

  


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
    const newEnemiesData = enemies.filter(enemy => enemy.enemyStageNumber === stageNumber)
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
    }))

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

    const newEnemiesData = enemies.filter(enemy => enemy.enemyStageNumber === newStageNumber)
    const nextEnemy = newEnemiesData[Math.floor(Math.random() * newEnemiesData.length)]
    setEnemyData(nextEnemy)
    setMaxEnemyHp(nextEnemy.hp)
    setEnemyHp(nextEnemy.hp)
 
    setVictory(false)
    setClearGame(false)
    setNextStageButton(false)
  }




  return {
    // attackClick,
    // fireClick,
    // potionClick,
    // poisonClick,
    // sleepClick,
    // magicpotionClick,

    magicPotionBuyClick,
    modalNextButtonClick,
    potionBuyClick,
    potionSellClick,
    magicPotionSellClick,
    modalNextStageClick,
  }

}