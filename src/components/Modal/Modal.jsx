import styles from './Modal.module.scss';
import { gameSetting } from '../../settings/gameSetting';
import useStore from '../../store/stateSettings';

const Modal = ({

  modalView,
  modalTitleText,
  clearGame,
  nextStageButton,
  onModalNextButtonClick,
  onModalNextStageClick,
  onSetModalView,
  onPotionClick,
  onMagicPotionClick,
  onPoisonClick,
  onSleepClick,
  onPotionBuyClick,
  onMagicPotionBuyClick,
  onPotionSellClick,
  onMagicPotionSellClick,

}) => {
  const {
    potionPrice,
    magicPotionPrice,
  } = gameSetting

  const { victory, defeat, playerData } = useStore()
  return (
    <>
      <div className={`${styles.mask} ${(victory) || (defeat) || (modalView === 'skill' || modalView === 'item') ? styles.active : ''}`}></div>
      <div className={`${styles.modal} ${(victory) || (defeat) || (modalView === 'skill' || modalView === 'item') ? styles.active : ''}`}>
        <div className={`${styles.modalTitle} ${(modalView === 'shopSelect' || modalView === 'skill' || modalView === 'item' || modalView === 'buy' || modalView === 'sell') ? styles.hidden : ''}`} >{modalTitleText}</div>
        <a onClick={onModalNextButtonClick} className={`${styles.modalNextButton} ${(defeat) || (clearGame) || (modalView === 'shopSelect' || modalView === 'skill' || modalView === 'item' || modalView === 'buy' || modalView === 'sell') ? styles.hidden : ''}`}>次へ進む</a>
        <a onClick={() => onSetModalView('shopSelect')} className={`${styles.modalShopButton} ${(defeat) || (clearGame) || (modalView === 'shopSelect' || modalView === 'skill' || modalView === 'item' || modalView === 'buy' || modalView === 'sell') ? styles.hidden : ''}`}>ショップ</a>
        <a onClick={onModalNextStageClick} className={`${styles.modalNextStageClick} ${(!nextStageButton) ? styles.hidden : ''}`}>次のステージへ</a>
        <ul className={`${styles.itemLists} ${(modalView !== 'item') ? styles.none : ''}`}>
          <li className={`${styles.potion} ${(playerData.canUsePotion) ? '' : styles.deactive}`} onClick={onPotionClick}>ポーション ×{playerData.nowHavePotion}</li>
          <li className={`${styles.magicPotion} ${(playerData.canUseMagicPotion) ? '' : styles.deactive}`} onClick={onMagicPotionClick}>マジックポーション ×{playerData.nowHaveMagicPotion}</li>
          <li className={styles.ItemBack} onClick={() => onSetModalView('')}>戻る</li>
        </ul>

        <ul className={`${styles.skillLists} ${(modalView !== 'skill') ? styles.none : ''}`}>
          <li className={`${styles.poison} ${(!playerData.canUsePoison) ? styles.deactive : ''}`} onClick={onPoisonClick}>ポイズン</li>
          <li className={`${styles.sleep} ${(!playerData.canUseSleep) ? styles.deactive : ''}`} onClick={onSleepClick}>スリープ</li>
          <li className={styles.SkillBack} onClick={() => onSetModalView('')}>戻る</li>
        </ul>

        <ul className={`${styles.shopSelect} ${(modalView !== 'shopSelect') || (modalView === 'buy') || (modalView === 'sell') ? styles.none : ''}`}>
          <li className={styles.buy} onClick={() => onSetModalView('buy')}>買う</li>
          <li className={styles.sell} onClick={() => onSetModalView('sell')}>売る</li>
          <li className={styles.shopSelectBack} onClick={() => onSetModalView('')}>戻る</li>
        </ul>

        <ul className={`${styles.itemListsBuy} ${(modalView !== 'buy') ? styles.none : ''}`}>
          <div className={styles.playerMoney}>
            所持金: {playerData.nowHaveMoney} ¥
          </div>
          <li className={styles.potionBuy} >ポーション　{potionPrice}＄ 　所持数：{playerData.nowHavePotion}<button className={`${styles.potionBuy} ${(playerData.nowHaveMoney < potionPrice) ? styles.deactive : ''}`} onClick={onPotionBuyClick}>買う</button></li>
          <li className={styles.magicPotionBuy}>マジックポーション {magicPotionPrice}$ 所持数：{playerData.nowHaveMagicPotion}<button className={`${styles.magicPotionBuy} ${(playerData.nowHaveMoney < magicPotionPrice) ? styles.deactive : ''}`} onClick={onMagicPotionBuyClick}>買う</button></li>
          <li className={styles.ItemBack} onClick={() => onSetModalView('')}>戻る</li>
        </ul>
        <ul className={`${styles.itemListSell} ${(modalView !== 'sell') ? styles.none : ''}`}>
          <div className={styles.playerMoney}>
            所持金: {playerData.nowHaveMoney} ¥
          </div>
          <li className={styles.potionBuy} >ポーション {potionPrice / 2}＄　所持数：{playerData.nowHavePotion} <button className={`${styles.potionSell} ${(playerData.nowHavePotion <= 0) ? styles.deactive : ''}`} onClick={onPotionSellClick}>売る</button></li>
          <li className={styles.magicPotionBuy}>マジックポーション {magicPotionPrice / 2}$　所持数：{playerData.nowHaveMagicPotion} <button className={`${styles.magicPotionSell} ${(playerData.nowHaveMagicPotion <= 0) ? styles.deactive : ''}`} onClick={onMagicPotionSellClick}>売る</button></li>
          <li className={styles.ItemBack} onClick={() => onSetModalView('')}>戻る</li>
        </ul>
      </div>
    </>
    
  )
  
}

export default Modal