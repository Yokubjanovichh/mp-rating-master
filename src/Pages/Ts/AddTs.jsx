import React, { useState } from "react";
import { Action } from "../../Components/Action/Action";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { Table } from "../../Components/Table/Table";
import { status } from "../../Utility/status";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { TbCheckupList } from "react-icons/tb";
import { IoRocketOutline } from "react-icons/io5";
import { useAddTsMutation, useGetTsQuery } from "../../Context/ts.service";
import toast from "react-hot-toast";
import { date } from "../../Utility/date";
import { useProductInfoMutation } from "../../Context/ts.service";
import { price } from "../../Utility/price";
import { useCalcPricesMutation } from "../../Context/ts.service";

export const AddTs = () => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [draft, setDraft] = useState(false);
  const { data = null } = useGetTsQuery();
  const [sku, setSku] = useState(null);
  const [calc, setCalc] = useState(null);
  const navigate = useNavigate();

  const [addTs] = useAddTsMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = Object.fromEntries(new FormData(e.target));
    value.sku = sku?.sku;
    value.size = sku?.sizes[sizeIndex];
    value.cart_qty = amount;
    value.executors_qty = total;
    value.draft = draft;
    const { error } = await addTs(value);
    if (error) return toast.error("Ошибка при добавлении ТЗ");
    toast.success("ТЗ успешно добавлено");
    setAmount("");
    setTotal("");
    setDraft(false);
    setSku(null);
    setCalc(null);
    return e.target.reset();
  };

  const [getProductInfo] = useProductInfoMutation();
  const handleSku = async (e) => {
    const { data, error } = await getProductInfo({ sku: e.target.value });
    if (error) throw new Error("Ошибка при получении данных");
    setSizeIndex(0);
    return setSku(data || null);
  };

  const [calcPrices] = useCalcPricesMutation();
  const handleCalculatePrice = async () => {
    const insert = { sku: sku?.sku, cart_qty: amount, executors_qty: total };
    const { data, error } = await calcPrices(insert);
    if (error) return toast.error("Ошибка при расчете цены");
    return setCalc(data);
  };

  return (
    <div className="page">
      <Action>
        <div className="action_left">
          <Link to="/">
            <AiFillHome />
          </Link>
          <GoDotFill />
          <Link to="/add-ts">
            <span>Новое ТЗ</span>
          </Link>
        </div>
      </Action>

      <div className="page-container add-ts-container">
        <Table>
          <thead>
            <tr>
              <td>Номер ТЗ</td>
              <td>Артикулы</td>
              <td>
                Кол-во
                <br />
                исполнителей
              </td>
              <td>Цена</td>
              <td>Статус</td>
              <td className="table__date">Дата и время</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index} onClick={() => navigate(`/ts/${item.id}`)}>
                  <td>{item.id}</td>
                  <td>{item.sku}</td>
                  <td>{item.executors_qty}</td>
                  <td>{item.product_price}</td>
                  <td>{status(item?.status?.name)}</td>
                  <td>{date(item.created, "dd.mm.yyyy hh:mm")}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <form className="add-ts-form" onSubmit={handleSubmit}>
          <div className="add-ts-form-box_1">
            <h3>Создание нового ТЗ</h3>
          </div>

          <div className="add-ts-form-box_2">
            <label>
              <span>Поисковой запрос</span>
              <input
                className="input"
                type="text"
                autoComplete="off"
                required
                placeholder="Поле для ввода"
                name="query"
              />
            </label>

            <div className="add-ts-form-group">
              <span>Артикул</span>
              <input
                type="text"
                className="input"
                required
                placeholder="Поле для Артикул"
                name="sku"
                autoComplete="off"
                onChange={handleSku}
              />

              <div>
                <span>Размер:</span>
                <code className="input">{sku?.sizes[sizeIndex] || ""}</code>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (sizeIndex < sku?.sizes.length - 1)
                        setSizeIndex(sizeIndex + 1);
                    }}
                  >
                    <BiSolidUpArrow />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (sizeIndex > 0) setSizeIndex(sizeIndex - 1);
                    }}
                  >
                    <BiSolidDownArrow />
                  </button>
                </div>
              </div>

              <div>
                <span>
                  Кол-во
                  <br />в корзине:
                </span>
                <input
                  type="number"
                  className="input"
                  placeholder="0"
                  autoComplete="off"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  name="cart_qty"
                />
                <div>
                  <button type="button" onClick={() => setAmount(+amount + 1)}>
                    <BiSolidUpArrow />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmount(amount <= 1 ? 0 : amount - 1)}
                  >
                    <BiSolidDownArrow />
                  </button>
                </div>
              </div>
            </div>

            <label>
              <span>ПВЗ</span>
              <input
                className="input"
                autoComplete="off"
                type="text"
                required
                placeholder="Поле для ввода"
                name="pickup_point"
              />
            </label>

            <div className="add-ts-form-group">
              <div>
                <span>
                  Кол-во
                  <br />
                  исполнителей:
                </span>
                <input
                  placeholder="0"
                  type="number"
                  className="input"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  name="executors_qty"
                  autoComplete="off"
                />
                <div>
                  <button type="button" onClick={() => setTotal(+total + 1)}>
                    <BiSolidUpArrow />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTotal(total <= 1 ? 0 : total - 1)}
                  >
                    <BiSolidDownArrow />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="add-ts-form-box_3">
            <button type="button" onClick={handleCalculatePrice}>
              <span>Расчитать цену</span>
            </button>

            <p>
              <b>
                <span>{price(calc?.price)}</span>
                <i>₽</i>
              </b>

              <span>Цена товара</span>
            </p>
            <p>
              <b>
                <span>{price(calc?.executors_price)}</span>
                <i>₽</i>
              </b>
              <span>Размер вознаграждения исполнителей</span>
            </p>
            <p>
              <b>
                <span>{price(calc?.total_price)}</span>
                <i>₽</i>
              </b>
              <span>Итоговая цена</span>
            </p>
          </div>

          <div className="add-ts-form-box_4">
            <button onClick={() => setDraft(true)}>
              <span>Сохранить в черновик</span>
              <TbCheckupList />
            </button>
            <button onClick={() => setDraft(false)}>
              <span>Отправить</span>
              <IoRocketOutline />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
