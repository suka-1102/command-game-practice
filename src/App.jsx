import { useGameFlow } from './system/gameFlow'
import Modal from './components/Modal/Modal'
import PlayerSection from './components/PlayerSection/PlayerSection'
import EnemySection from './components/EnemySection/EnemySection'
import useStore from './store/stateSettings'

const App = () => {

  const { enemyData, stageNumber} = useStore()

  const { 
    modalTitleText,
    
   } = useGameFlow()
   


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
        />
   
      </main>
      <Modal
        modalTitleText={modalTitleText}
      />
    </>
  )
}

export default App

