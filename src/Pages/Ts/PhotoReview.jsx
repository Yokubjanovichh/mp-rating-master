import React, { memo, useState } from "react";
import "./PhotoReview.css";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsEnvelopeArrowUp } from "react-icons/bs";
import { Checkbox } from "../../ui/checkbox";

export const PhotoReview = memo(({ photorreview, setPhotoReview }) => {
  const tab = document.querySelector(".photo_review__body");
  const [cancel, setCancel] = useState(false);
  const [len, setLen] = useState(0);

  const handleCancel = () => {
    setCancel(!cancel);
    tab.setAttribute("style", "--active-tab: 0");
    return tab.setAttribute("style", `--active-tab: ${cancel ? 0 : 1}`);
  };

  const handleClose = () => {
    setPhotoReview(false);
    tab.setAttribute("style", "--active-tab: 0");
  };

  return (
    <div className={photorreview ? "modal-wrapper active" : "modal-wrapper"}>
      <div className="modal-container video_review__modal-container">
        <button className="modal-close_btn" onClick={handleClose}>
          <AiOutlineClose />
        </button>
        <div className="modal video_review__modal">
          <div className="video_review">
            <div className="video_review">
              <div className="video_review__title">
                <p>Видеоотчёт от исполнителя</p>
              </div>

              <div className="photo_review__body">
                <div
                  className="video_review__video photo_review_box"
                  tabIndex="0"
                >
                  <img src="https://picsum.photos/300/300" alt="" />
                </div>

                <form
                  className="video_review_cancel photo_review_box"
                  tabIndex="1"
                >
                  <div>
                    <label>
                      <Checkbox />
                      <span>Отзыв не оставлен</span>
                    </label>
                    <label>
                      <Checkbox />
                      <span>Не тот отчёт</span>
                    </label>
                    <label>
                      <Checkbox />
                      <span>Неправильный текст отзыва</span>
                    </label>
                  </div>

                  <label>
                    <div>
                      <span>Указать свою причину</span>
                      <span>{len} / 5000</span>
                    </div>
                    <textarea
                      onChange={(e) => setLen(e.target.value.length)}
                      className="input"
                      name="dispute"
                      placeholder="Поле ввода"
                      id=""
                      cols="30"
                      rows="10"
                    ></textarea>
                  </label>
                </form>
              </div>

              <div className="video_review__btn">
                <button onClick={handleCancel}>
                  <span>{!cancel ? "Отклонить" : "Назад"}</span>
                  {!cancel ? <AiOutlineClose /> : <IoChevronBackOutline />}
                </button>
                <button onClick={() => setPhotoReview(false)}>
                  <span>{!cancel ? "Принять" : "Отправить"}</span>
                  {!cancel ? <IoMdCheckmark /> : <BsEnvelopeArrowUp />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
