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

  const { enemyData} = useStore()
  const {
    playerStatus
  } = gameSetting

  const [playerData, setPlayerData] = useState(playerStatus)


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
    playerData,
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
    playerData,
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
    enemyDamage,
    playerData,
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
      enemyDamage,
      damageCalculation,
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
          isPoison={isPoison}
          isSleep={isSleep}
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

