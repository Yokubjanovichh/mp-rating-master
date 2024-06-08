import React, { memo, useState, useRef } from "react";
import "./VideoReview.css";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsEnvelopeArrowUp } from "react-icons/bs";
import { Checkbox } from "../../ui/checkbox";

export const VideoReview = memo(({ videoreview, setVideoReview }) => {
  const [cancel, setCancel] = useState(false);
  const [len, setLen] = useState(0);
  const tab = document.querySelector(".video_review__body");
  const videoRef = useRef(null);

  const handleCancel = () => {
    tab.setAttribute("style", "--active-tab: 0");
    tab.setAttribute("style", `--active-tab: ${cancel ? 0 : 1}`);
    videoRef.current.pause();
    setCancel(!cancel);
  };

  const handleClose = () => {
    tab.setAttribute("style", "--active-tab: 0");
    setVideoReview(false);
    videoRef.current.pause();
    setCancel(false);
  };

  return (
    <div className={videoreview ? "modal-wrapper active" : "modal-wrapper"}>
      <div className="modal-container video_review__modal-container">
        <button className="modal-close_btn" onClick={handleClose}>
          <AiOutlineClose />
        </button>
        <div className="modal video_review__modal">
          <div className="video_review">
            <div className="video_review__title">
              <p>Видеоотчёт от исполнителя</p>
            </div>

            <div className="video_review__body">
              <div
                className="video_review__video video_review_box"
                tabIndex="0"
              >
                <video
                  ref={videoRef}
                  src={require("./videoplayback.mp4")}
                  controls
                ></video>
              </div>

              <form
                className="video_review_cancel video_review_box"
                tabIndex="1"
              >
                <div>
                  <label>
                    <Checkbox />
                    <span>Выкуплен не тот товар</span>
                  </label>
                  <label>
                    <Checkbox />
                    <span>Не тот ПВЗ</span>
                  </label>
                  <label>
                    <Checkbox />
                    <span>Не тот поисковой запрос </span>
                  </label>
                  <label>
                    <Checkbox />
                    <span>Не тот размер</span>
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
              <button onClick={() => setVideoReview(false)}>
                <span>{!cancel ? "Принять" : "Отправить"}</span>
                {!cancel ? <IoMdCheckmark /> : <BsEnvelopeArrowUp />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
