import React, { memo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import "./ReadReview.css";

export const ReadReview = memo(({ readreview, setReadreview }) => {
  return (
    <div className={readreview ? "modal-wrapper active" : "modal-wrapper"}>
      <div className="modal-container">
        <button
          className="modal-close_btn"
          onClick={() => setReadreview(false)}
        >
          <AiOutlineClose />
        </button>
        <div className="modal">
          <div className="readreview">
            <div className="readreview_header">
              <h3>Отзыв к товару</h3>
              <figure>
                <img src="https://picsum.photos/200/300" alt="" />
                <img src="https://picsum.photos/200/300" alt="" />
                <img src="https://picsum.photos/200/300" alt="" />
                <img src="https://picsum.photos/200/300" alt="" />
              </figure>
            </div>

            <div className="readreview_box">
              <p>Оцените товар</p>
              <div className="readreview_star">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <div className="readreview_box">
              <p>Размер</p>
              <p>S</p>
            </div>

            <div className="readreview_box">
              <p>Соответствие размеру</p>
              <p>XXL</p>
            </div>

            <div className="readreview_box_comment">
              <b>Расскажите о товаре</b>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                itaque quod non eaque magni adipisci animi consectetur alias
                quam. Fuga quam enim voluptas quia accusantium, recusandae
                asperiores, dolorum assumenda eveniet blanditiis amet illum,
                neque
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
