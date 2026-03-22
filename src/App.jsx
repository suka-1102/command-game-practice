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
    enemyHp,
    maxEnemyHp,
    enemyDamage,
    playerData,
    nowKilledNumber,
    logs,
    victory,
    defeat,
    modalView,
    modalTitleText,
    clearGame,
    nextStageButton,
    stageNumber,
    potionPrice,
    magicPotionPrice,
    targetKilledNumber,
    plusPoint,
    setVictory,
    setEnemyHp,
    setDefeat,
    damageProcess,
    damageCalculation,
    insertLog,
    setPlayerData,
    setEnemyData,
    setMaxEnemyHp,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
    setModalView,
    setIsPoison,
    setIsSleep,
    setPlusPoint,
    setModalTitleText,
  } = battleLogic()

  gameFlow({
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
    setIsPoison,
    setIsSleep,
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
    isSleep,
    enemyData,
    enemyDamage,
    enemyHp,
    playerData,
    damageCalculation,
    insertLog,
    setEnemyHp,
    setEnemyData,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
    setVictory,
    setMaxEnemyHp,
    damageProcess,
    setIsSleep,
    setPlayerData,
    setDefeat,
    setIsPoison,
    setModalView,
  })
  
  return (
    <>
      <main>
        <div className="stage">ステージ{stageNumber}</div>
        <EnemySection
          enemyData={enemyData}
          isPoison={isPoison}
          isSleep={isSleep}
          enemyHp={enemyHp}
          maxEnemyHp={maxEnemyHp}
        />

        <PlayerSection
          playerData={playerData}
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

