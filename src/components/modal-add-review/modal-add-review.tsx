import { InvalidEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComments } from '../../store/api-actions';

type ModalAddReviewProps = {
  isModalReviewFormOpen: boolean,
  name: string,
  guitarId: string,
  onReviewModalClose: () => void
  onSuccessModalOpen: () => void
}

function ModalAddReview({ name, onReviewModalClose, isModalReviewFormOpen, guitarId, onSuccessModalOpen }: ModalAddReviewProps): JSX.Element {
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [advantagesValue, setAdvantagesValue] = useState('');
  const [disadvantagesValue, setDisadvantagesValue] = useState('');
  const [commentValue, setCommentValue] = useState('');

  const handleRateRadioClick = ({ target }: InvalidEvent<HTMLInputElement>) => {
    setRateValue(target.value);
  };

  const handleNameInputChange = ({ target }: InvalidEvent<HTMLInputElement>) => {
    setNameValue(target.value);
  };

  const handleAdvantageInputChange = ({ target }: InvalidEvent<HTMLInputElement>) => {
    setAdvantagesValue(target.value);
  };

  const handleDisadvantageInputChange = ({ target }: InvalidEvent<HTMLInputElement>) => {
    setDisadvantagesValue(target.value);
  };

  const handleCommentInputChange = ({ target }: InvalidEvent<HTMLTextAreaElement>) => {
    setCommentValue(target.value);
  };

  const onSuccessPost = () => {
    onReviewModalClose();
    onSuccessModalOpen();
  };

  const handleSubmitComment = (evt: InvalidEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (nameValue !== '' &&
      rateValue !== '' &&
      advantagesValue !== '' &&
      disadvantagesValue !== '' &&
      commentValue !== '') {
      dispatch(postComments(guitarId, {
        guitarId: +guitarId,
        userName: nameValue,
        advantage: advantagesValue,
        disadvantage: disadvantagesValue,
        comment: commentValue,
        rating: +rateValue,
      }, onSuccessPost));
    }
  };

  useEffect(() => {
    if (!isModalReviewFormOpen) {
      setNameValue('');
      setRateValue('');
      setAdvantagesValue('');
      setDisadvantagesValue('');
      setCommentValue('');
    }
  }, [isModalReviewFormOpen]);

  const handleTabClick = (event: any) => {
    if (event.key === 'Tab' || event.key === 9) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleTabClick);
    return () => {
      window.removeEventListener('keydown', handleTabClick);
    };
  }, []);

  return (
    <div
      className={isModalReviewFormOpen ?
        'modal is-active modal--review modal-for-ui-kit' :
        'modal modal--review modal-for-ui-kit'}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onReviewModalClose}></div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
          <form className="form-review" onSubmit={handleSubmitComment}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">

                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input
                  id="user-name"
                  className="form-review__input form-review__input--name"
                  type="text"
                  autoComplete="off"
                  value={nameValue}
                  onChange={handleNameInputChange}
                  required
                />
                {nameValue === '' && <span className="form-review__warning">Заполните поле</span>}
              </div>

              <div>
                <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" onChange={handleRateRadioClick} checked={rateValue === '5'} required />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" onChange={handleRateRadioClick} checked={rateValue === '4'} required />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" onChange={handleRateRadioClick} checked={rateValue === '3'} required />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" onChange={handleRateRadioClick} checked={rateValue === '2'} required />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" onChange={handleRateRadioClick} checked={rateValue === '1'} required />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                  <span className="rate__count"></span>
                  {rateValue === '' && <span className="rate__message">Поставьте оценку</span>}
                </div>
              </div>
            </div>
            <div>
              <label className="form-review__label form-review__label--required" htmlFor="user-advantages">Достоинства</label>
              <input
                id="user-advantages"
                className="form-review__input"
                type="text"
                autoComplete="off"
                value={advantagesValue}
                onChange={handleAdvantageInputChange}
                required
              />
              {advantagesValue === '' && <span className="form-review__warning">Заполните поле</span>}
            </div>
            <div>
              <label className="form-review__label form-review__label--required" htmlFor="user-disadvantages">Недостатки</label>
              <input
                className="form-review__input"
                id="user-disadvantages"
                type="text"
                autoComplete="off"
                value={disadvantagesValue}
                onChange={handleDisadvantageInputChange}
                required
              />
              {disadvantagesValue === '' && <span className="form-review__warning">Заполните поле</span>}
            </div>
            <div>
              <label className="form-review__label form-review__label--required" htmlFor="user-comment">Комментарий</label>
              <textarea
                className="form-review__input form-review__input--textarea"
                id="user-comment"
                rows={10}
                autoComplete="off"
                onChange={handleCommentInputChange}
                value={commentValue}
                required
              >
              </textarea>
              {commentValue === '' && <span className="form-review__warning">Заполните поле</span>}
            </div>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onReviewModalClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddReview;
