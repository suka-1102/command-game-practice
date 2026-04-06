import styles from './Modal.module.scss';
import { gameSetting } from '../../settings/gameSetting';
import useStore from '../../store/stateSettings';
import { useModalButtons } from '../../system/modalButtons';
import { useBattleButtons } from '../../system/battleButtons';

const Modal = ({
  modalTitleText
}) => {


  const { 
    magicPotionBuyClick, 
    modalNextButtonClick,
    potionBuyClick,
    potionSellClick,
    modalNextStageClick,
    magicPotionSellClick

  } = useModalButtons()

  const {
    potionClick,
    magicPotionClick,
    poisonClick,
    sleepClick
  } = useBattleButtons()

  const { 
    victory, defeat,clearGame, 
    playerData,
    modalView, setModalView,nextStageButton, 
  } = useStore()
  return (
    <>
      <div className={`${styles.mask} ${(victory) || (defeat) || (modalView === 'skill' || modalView === 'item') ? styles.active : ''}`}></div>
      <div className={`${styles.modal} ${(victory) || (defeat) || (modalView === 'skill' || modalView === 'item') ? styles.active : ''}`}>
        <div className={`${styles.modalTitle} ${(modalView === 'shopSelect' || modalView === 'skill' || modalView === 'item' || modalView === 'buy' || modalView === 'sell') ? styles.hidden : ''}`} >{modalTitleText}</div>
        <a onClick={modalNextButtonClick} className={`${styles.modalNextButton} ${(defeat) || (clearGame) || (modalView === 'shopSelect' || modalView === 'skill' || modalView === 'item' || modalView === 'buy' || modalView === 'sell') ? styles.hidden : ''}`}>次へ進む</a>
        <a onClick={() => setModalView('shopSelect')} className={`${styles.modalShopButton} ${(defeat) || (clearGame) || (modalView === 'shopSelect' || modalView === 'skill' || modalView === 'item' || modalView === 'buy' || modalView === 'sell') ? styles.hidden : ''}`}>ショップ</a>
        <a onClick={modalNextStageClick} className={`${styles.modalNextStageClick} ${(!nextStageButton) ? styles.hidden : ''}`}>次のステージへ</a>
        <ul className={`${styles.itemLists} ${(modalView !== 'item') ? styles.none : ''}`}>
          <li className={`${styles.potion} ${(playerData.canUsePotion) ? '' : styles.deactive}`} onClick={potionClick}>ポーション ×{playerData.nowHavePotion}</li>
          <li className={`${styles.magicPotion} ${(playerData.canUseMagicPotion) ? '' : styles.deactive}`} onClick={magicPotionClick}>マジックポーション ×{playerData.nowHaveMagicPotion}</li>
          <li className={styles.ItemBack} onClick={() => setModalView('')}>戻る</li>
        </ul>

        <ul className={`${styles.skillLists} ${(modalView !== 'skill') ? styles.none : ''}`}>
          <li className={`${styles.poison} ${(!playerData.canUsePoison) ? styles.deactive : ''}`} onClick={poisonClick}>ポイズン</li>
          <li className={`${styles.sleep} ${(!playerData.canUseSleep) ? styles.deactive : ''}`} onClick={sleepClick}>スリープ</li>
          <li className={styles.SkillBack} onClick={() => setModalView('')}>戻る</li>
        </ul>

        <ul className={`${styles.shopSelect} ${(modalView !== 'shopSelect') || (modalView === 'buy') || (modalView === 'sell') ? styles.none : ''}`}>
          <li className={styles.buy} onClick={() => setModalView('buy')}>買う</li>
          <li className={styles.sell} onClick={() => setModalView('sell')}>売る</li>
          <li className={styles.shopSelectBack} onClick={() => setModalView('')}>戻る</li>
        </ul>

        <ul className={`${styles.itemListsBuy} ${(modalView !== 'buy') ? styles.none : ''}`}>
          <li className={styles.playerMoney}>
            所持金: {playerData.nowHaveMoney} ¥
          </li>
          <li className={styles.potionBuy} >ポーション　{gameSetting.potionPrice}＄ 　所持数：{playerData.nowHavePotion}<button className={`${styles.potionBuy} ${(playerData.nowHaveMoney < gameSetting.potionPrice) ? styles.deactive : ''}`} onClick={potionBuyClick}>買う</button></li>
          <li className={styles.magicPotionBuy}>マジックポーション {gameSetting.magicPotionPrice}$ 所持数：{playerData.nowHaveMagicPotion}<button className={`${styles.magicPotionBuy} ${(playerData.nowHaveMoney < gameSetting.magicPotionPrice) ? styles.deactive : ''}`} onClick={magicPotionBuyClick}>買う</button></li>
          <li className={styles.ItemBack} onClick={() => setModalView('')}>戻る</li>
        </ul>
        <ul className={`${styles.itemListSell} ${(modalView !== 'sell') ? styles.none : ''}`}>
          <li className={styles.playerMoney}>
            所持金: {playerData.nowHaveMoney} ¥
          </li>
          <li className={styles.potionBuy} >ポーション {gameSetting.potionPrice / 2}＄　所持数：{playerData.nowHavePotion} <button className={`${styles.potionSell} ${(playerData.nowHavePotion <= 0) ? styles.deactive : ''}`} onClick={potionSellClick}>売る</button></li>
          <li className={styles.magicPotionBuy}>マジックポーション {gameSetting.magicPotionPrice / 2}$　所持数：{playerData.nowHaveMagicPotion} <button className={`${styles.magicPotionSell} ${(playerData.nowHaveMagicPotion <= 0) ? styles.deactive : ''}`} onClick={magicPotionSellClick}>売る</button></li>
          <li className={styles.ItemBack} onClick={() => setModalView('')}>戻る</li>
        </ul>
      </div>
    </>
    
  )
  
}

export default Modal