import { battleLogic } from './system/battleLogic'
import { gameFlow } from './system/gameFlow'
import Modal from './components/Modal/Modal'
import PlayerSection from './components/PlayerSection/PlayerSection'
import EnemySection from './components/EnemySection/EnemySection'
import { ModalButtons } from './system/modalButtons'
import { BattleButtons } from './system/battleButtons'
import { useState } from 'react';
import { gameSetting } from './settings/gameSetting'
import useStore from './store/stateSettings'

const App = () => {

  const {maxEnemyHp, enemyData} = useStore()
  const {
    playerStatus
  } = gameSetting

  const [playerData, setPlayerData] = useState(playerStatus)

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
  } = battleLogic({
    // enemyData,
    playerData,
    enemyHp, 
    setEnemyHp,
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
    // enemyData,
    playerData,
    // setEnemyData,
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
    // enemyData,
    enemyDamage,
    playerData,
    setEnemyHp,
    // setEnemyData,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,
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
      // enemyData,
      enemyHp,
      enemyDamage,
      damageCalculation,
      setEnemyHp,
      insertLog,
      damageProcess,
      setPlayerData,
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
          // enemyData={enemyData}
          isPoison={isPoison}
          isSleep={isSleep}
          enemyHp={enemyHp}
        />

        <PlayerSection
          playerData={playerData}
          nowKilledNumber={nowKilledNumber}
          logs={logs}
          onAttackClick={attackClick}
          onFireClick={fireClick}
          onSetModalView={setModalView}
        />
   
      </main>
      <Modal
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

