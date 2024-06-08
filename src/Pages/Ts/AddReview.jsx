import React, { memo, useState } from "react";
import "./AddReview.css";
// import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

export const AddReview = memo(({ addreview, setAddreview }) => {
  const [rating, setRating] = useState(0);
  const handleRating = (e) => setRating(e.target.value);
  const [files, setFiles] = useState([]);
  const [len, setLen] = useState(0);
  const handleFile = (e) => {
    if (files.length + e.target.files.length >= 5) {
      let data, start, end;
      data = [...files, ...e.target.files];
      start = data.length > 5 ? data.length - 5 : 0;
      end = data.length;
      console.log(start, end);
      return setFiles(data.slice(start, end));
    }
    setFiles([...files, ...e.target.files]);
  };

  // const handleDel = (index) => {
  //   setFiles(files.filter((_, i) => i !== index));
  // };
  const closeModal = () => setAddreview(false);

  return (
    <div className={addreview ? "modal-wrapper active" : "modal-wrapper"}>
      <div className={`modal-container`}>
        <button className="modal-close_btn" onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <div className="modal">
          <form className="addreview">
            <div className="addreview__header">
              <h2>Отзыв к товару</h2>
              <div>
                {files.length > 0 &&
                  files.map((file, index) => (
                    <figure key={index}>
                      <img src={URL.createObjectURL(file)} alt="img" />
                      {/* <button type="button" onClick={() => handleDel(index)}>
                        <FaRegTrashAlt />
                      </button> */}
                    </figure>
                  ))}
              </div>
            </div>

            <div className="addreview__box">
              <p>Оцените товар</p>

              <div className="addreview__box__rating">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <label key={index} onClick={handleRating}>
                    <input type="radio" name="rating" value={star} />
                    <FaStar color={star <= rating ? "#ffc107" : "#e4e5e9"} />
                  </label>
                ))}
              </div>
            </div>

            <div className="addreview__box">
              <p>Размер</p>
              <b>S</b>
            </div>

            <div className="addreview__box">
              <p>Соответствие размеру</p>
              <select name="" className="input">
                <option value="null">Выберите из списка</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
            </div>

            <label className="addreview__addcomment">
              <div>
                <span>Расскажите о товаре</span>
                <i>{len} / 5000</i>
              </div>

              <textarea
                name="comment"
                className="input"
                placeholder="Напишите отзыв о товаре"
                autoComplete="off"
                maxLength="5000"
                onChange={(e) => setLen(e.target.value.length)}
              />
            </label>

            <div className="addreview__addphoto">
              <p>Загрузите до 5 фотографий</p>

              <label>
                <input
                  type="file"
                  multiple
                  onChange={handleFile}
                  accept="image/jpg, image/jpeg, image/png, image/bmp, image/gif"
                />
                <TbCameraPlus />
              </label>

              <div className="addreview__addphoto__info">
                <p>Нажмите на область с иконкой</p>
                <span>Формат JPG, JPEG, PNG, BMP, GIF</span>
              </div>

              <div className="addreview__price">
                <p>
                  <span>000</span>
                  <i>₽</i>
                </p>
                <span>Цена</span>
              </div>
            </div>
            <button type="submit">Купить</button>
          </form>
        </div>
      </div>
    </div>
  );
});
