import { battleLogic } from './system/battleLogic'
import { gameFlow } from './system/gameFlow'
import Modal from './components/Modal/Modal'
import PlayerSection from './components/PlayerSection/PlayerSection'
import EnemySection from './components/EnemySection/EnemySection'
import { ModalButtons } from './system/modalButtons'
import { BattleButtons } from './system/battleButtons'
import { useState } from 'react';
import { gameSetting } from './settings/gameSetting'

const App = () => {

  const {
    playerStatus
  } = gameSetting
  const [victory, setVictory] = useState(false)
  const [defeat, setDefeat] = useState(false)

  const [enemyData, setEnemyData] = useState()
  const [playerData, setPlayerData] = useState(playerStatus)

  const [maxEnemyHp, setMaxEnemyHp] = useState()
  const [enemyHp, setEnemyHp] = useState(maxEnemyHp)


  const {
    isPoison,
    isSleep,
    enemyDamage,
    logs,
    damageProcess,
    damageCalculation,
    insertLog,
    setIsPoison,
    setIsSleep,
    // setEnemyHp,
    // setMaxEnemyHp,
    // enemyHp,
    // maxEnemyHp,
    // setPlayerData,
    // setEnemyData,
    // playerData,
    // victory,
    // defeat,
    // enemyData,
    // setDefeat,
  } = battleLogic({
    enemyData,
    playerData,
    enemyHp, 
    setEnemyHp,
    setVictory,
    setDefeat,
    setPlayerData,
  })

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
  })

  const {
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

  })

  const {
    attackClick,
    fireClick,
    potionClick,
    magicpotionClick,
    sleepClick,
    poisonClick,
    setModalView,
    modalView,
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

