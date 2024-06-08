import React, { useMemo } from "react";
import "./Home.css";
import { Action } from "../../Components/Action/Action";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBox } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { Table } from "../../Components/Table/Table";
import { status } from "../../Utility/status";
import { useGetTsQuery } from "../../Context/ts.service";
import { date } from "../../Utility/date";

export const Home = () => {
  const navigate = useNavigate();

  const { data = null } = useGetTsQuery();

  const columns = useMemo(() => {
    return data?.map((item, index) => {
      return (
        <tr
          key={index}
          onClick={() => navigate(`/ts/${item?.id}`)}
          style={{ cursor: "pointer" }}
        >
          <td>{item.id}</td>
          <td>{item.sku}</td>
          <td>{item.cart_qty}</td>
          <td>{item.executors_qty}</td>
          <td>{item.total_price}</td>
          <td>{status(item?.status?.name)}</td>
          <td>{date(item.created, "dd.mm.yyyy hh:mm")}</td>
        </tr>
      );
    });
  }, [data, navigate]);

  return (
    <div className="page">
      <Action>
        <div className="action_left">
          <Link to="/">
            <AiFillHome />
            <span>Главная</span>
          </Link>
        </div>
        <div className="action_right">
          <Link to="/courier">
            <span>Мои курьеры</span>
            <FaBox />
          </Link>
          <Link to="/add-ts">
            <span>Новое ТЗ</span>
            <FiPlus />
          </Link>
        </div>
      </Action>
      <div className="page-container">
        <Table>
          <thead>
            <tr>
              <th>Номер ТЗ</th>
              <th>Артикулы</th>
              <th>Количество</th>
              <th>
                Кол-во
                <br />
                исполнителей
              </th>
              <th>Цена</th>
              <th>Статус</th>
              <th className="table__date">Дата и время</th>
            </tr>
          </thead>
          <tbody>{columns}</tbody>
        </Table>
      </div>
    </div>
  );
};
