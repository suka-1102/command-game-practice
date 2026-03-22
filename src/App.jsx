import { battleLogic } from './system/battleLogic'
import { gameFlow } from './system/gameFlow'
import Modal from './components/Modal/Modal'
import PlayerSection from './components/PlayerSection/PlayerSection'
import EnemySection from './components/EnemySection/EnemySection'
import { Buttons } from './system/Buttons'

const App = () => {

  const {
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
    canPotionSell,
    canMagicPotionSell,
    potionPrice,
    magicPotionPrice,
    targetKilledNumber,
    enemiesData,
    plusPoint,
    setVictory,
    hpGaugeChangeColor,
    setEnemyHp,
    setCanPotionSell,
    setDefeat,
    damageProcess,
    damageCalculation,
    insertLog,
    setPlayerData,
    setEnemyData,
    setMaxEnemyHp,
    setCanMagicPotionSell,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
    setModalView,
    setIsPoison,
    setIsSleep,
    setCanMagicPotionBuy,
    setCanPotionBuy,
    setEnemyHpGaugeColor,
    setPlusPoint,
    setModalTitleText,
  } = battleLogic()

  gameFlow({
    enemiesData,
    enemyData,
    playerData,
    victory,
    defeat,
    nowKilledNumber,
    plusPoint,
    stageNumber,
    setEnemyData,
    setMaxEnemyHp,
    setEnemyHp,
    setNowKilledNumber,
    setEnemyHpGaugeColor,
    setIsPoison,
    setIsSleep,
    setCanPotionBuy,
    setCanMagicPotionBuy,
    setPlayerData,
    setPlusPoint,
    setClearGame,
    setModalTitleText,
    setNextStageButton,
  })

  if (!enemyData) {
    return <div>Loading</div>
  }

  const {
    attackClick,
    fireClick,
    potionClick,
    poisonClick,
    sleepClick,
    magicPotionBuyClick,
    potionBuyClick,
    potionSellClick,
    magicpotionClick,
    modalNextButtonClick,
    magicPotionSellClick,
    modalNextStageClick,
  } = Buttons({
    stageNumber,
    enemiesData,
    isSleep,
    enemyData,
    enemyDamage,
    enemyHp,
    playerData,
    damageCalculation,
    insertLog,
    setEnemyHp,
    setEnemyData,
    setCanMagicPotionSell,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
    setVictory,
    setMaxEnemyHp,
    damageProcess,
    setIsSleep,
    setPlayerData,
    hpGaugeChangeColor,
    setCanPotionSell,
    setDefeat,
    setIsPoison,
    setModalView,
    setCanMagicPotionBuy,
    setCanPotionBuy,
  })
  
  return (
    <>
      <main>
        <div className="stage">ステージ{stageNumber}</div>
        <EnemySection
          enemyData={enemyData}
          isPoison={isPoison}
          isSleep={isSleep}
          enemyHpGaugeColor={enemyHpGaugeColor}
          enemyHp={enemyHp}
          maxEnemyHp={maxEnemyHp}
        />

        <PlayerSection
          playerData={playerData}
          playerHpGaugeColor={playerHpGaugeColor}
          nowKilledNumber={nowKilledNumber}
          logs={logs}
          targetKilledNumber={targetKilledNumber}
          victory={victory}
          defeat={defeat}
          onAttackClick={attackClick}
          onFireClick={fireClick}
          onSetModalView={setModalView}
        />
   
      </main>
      <Modal
        victory={victory}
        defeat={defeat}
        modalView={modalView}
        modalTitleText={modalTitleText}
        clearGame={clearGame}
        nextStageButton={nextStageButton}
        playerData={playerData}
        potionPrice={potionPrice}
        magicPotionPrice={magicPotionPrice}
        canPotionBuy={canPotionBuy}
        canMagicPotionBuy={canMagicPotionBuy}
        canPotionSell={canPotionSell}
        canMagicPotionSell={canMagicPotionSell}
        onModalNextButtonClick={modalNextButtonClick}
        onModalNextStageClick={modalNextStageClick}
        onSetModalView={setModalView}
        onPotionClick={potionClick}
        onMagicPotionClick={magicpotionClick}
        onPoisonClick={poisonClick}
        onSleepClick={sleepClick}
        onPotionBuyClick={potionBuyClick}
        onMagicPotionBuyClick={magicPotionBuyClick}
        onPotionSellClick={potionSellClick}
        onMagicPotionSellClick={magicPotionSellClick}
      />
    </>
  )
}

export default App

