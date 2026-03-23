import { battleLogic } from './system/battleLogic'
import { gameFlow } from './system/gameFlow'
import Modal from './components/Modal/Modal'
import PlayerSection from './components/PlayerSection/PlayerSection'
import EnemySection from './components/EnemySection/EnemySection'
import { ModalButtons } from './system/modalButtons'
import { BattleButtons } from './system/battleButtons'

const App = () => {

  const {
    enemyData,
    isPoison,
    isSleep,
    enemyHp,
    maxEnemyHp,
    enemyDamage,
    playerData,
    logs,
    victory,
    defeat,
    modalView,
    potionPrice,
    magicPotionPrice,
    targetKilledNumber,
    setVictory,
    setEnemyHp,
    setDefeat,
    damageProcess,
    damageCalculation,
    insertLog,
    setPlayerData,
    setEnemyData,
    setMaxEnemyHp,
    setModalView,
    setIsPoison,
    setIsSleep,
    // plusPoint,
    // setStageNumber,
    // setNowKilledNumber,
    // setClearGame,
    // setNextStageButton,
    // setPlusPoint,
    // nowKilledNumber,
    // clearGame,
    // nextStageButton,
    // stageNumber,
  } = battleLogic()

  const { 
    modalTitleText,
    nowKilledNumber,
    nextStageButton,
    stageNumber,
    clearGame,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
   } = gameFlow({
    enemyData,
    playerData,
    victory,
    defeat,
    setEnemyData,
    setMaxEnemyHp,
    setEnemyHp,
    setIsPoison,
    setIsSleep,
    setPlayerData,
    // setPlusPoint,
    // plusPoint,
    // stageNumber,
  })

  const {
    // attackClick,
    // fireClick,
    // potionClick,
    // poisonClick,
    // sleepClick,
    // magicpotionClick,
    magicPotionBuyClick,
    potionBuyClick,
    potionSellClick,
    modalNextButtonClick,
    magicPotionSellClick,
    modalNextStageClick,
  } = ModalButtons({
    stageNumber,
    enemyData,
    enemyDamage,
    playerData,
    setEnemyHp,
    setEnemyData,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
    setVictory,
    setMaxEnemyHp,
    setPlayerData,
    // damageProcess,
    // setIsSleep,
    // isSleep,
    // enemyHp,
    // damageCalculation,
    // insertLog,
    // setDefeat,
    // setIsPoison,
    // setModalView,
  })

  const {
    attackClick,
    fireClick,
    potionClick,
    magicpotionClick,
    sleepClick,
    poisonClick,
  } = BattleButtons({
      isSleep,
      playerData,
      enemyData,
      enemyHp,
      enemyDamage,
      damageCalculation,
      setEnemyHp,
      insertLog,
      damageProcess,
      setPlayerData,
      setDefeat,
      setIsSleep,
      setIsPoison,
      setModalView,
      
  })

  if (!enemyData) {
    return <div>Loading</div>
  }

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

