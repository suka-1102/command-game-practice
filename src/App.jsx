import { gameFlow } from './system/gameFlow'
import Modal from './components/Modal/Modal'
import PlayerSection from './components/PlayerSection/PlayerSection'
import EnemySection from './components/EnemySection/EnemySection'
import { ModalButtons } from './system/modalButtons'
import { BattleButtons } from './system/battleButtons'
import useStore from './store/stateSettings'

const App = () => {

  const { enemyData} = useStore()

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
   } = gameFlow()

  const {
    magicPotionBuyClick,
    potionBuyClick,
    potionSellClick,
    modalNextButtonClick,
    magicPotionSellClick,
    modalNextStageClick,
  } = ModalButtons({
    stageNumber,
    setStageNumber,
    setNowKilledNumber,
    setClearGame,
    setNextStageButton,

  })

  const {
    potionClick,
    magicpotionClick,
    sleepClick,
    poisonClick,
  } = BattleButtons()

  if (!enemyData) {
    return <div>Loading</div>
  }

  return (
    <>
      <main>
        <div className="stage">ステージ{stageNumber}</div>
        <EnemySection
        />

        <PlayerSection
          nowKilledNumber={nowKilledNumber}
        />
   
      </main>
      <Modal
        modalTitleText={modalTitleText}
        clearGame={clearGame}
        nextStageButton={nextStageButton}
        onModalNextButtonClick={modalNextButtonClick}
        onModalNextStageClick={modalNextStageClick}
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

