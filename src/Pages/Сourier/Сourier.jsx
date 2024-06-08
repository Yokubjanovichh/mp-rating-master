import React from "react";
import { Action } from "../../Components/Action/Action";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { Table } from "../../Components/Table/Table";
import { FiTrash2 } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { useGetCouriersQuery } from "../../Context/courier.service";
import { useAddCourierMutation } from "../../Context/courier.service";
import { useDeleteCourierMutation } from "../../Context/courier.service";

export const Courier = () => {
  const { data: couriers } = useGetCouriersQuery();

  const [addCourier] = useAddCourierMutation();
  const handleAddCourier = async (e) => {
    e.preventDefault();
    const value = Object.fromEntries(new FormData(e.target));
    const { error } = await addCourier(value);
    if (error) return toast.error("Ошибка при добавлении курьера");
    toast.success("Курьер успешно добавлен");
    return e.target.reset();
  };

  const [deleteCourier] = useDeleteCourierMutation();
  const handleDeleteCourier = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить курьера?")) return;
    const { error } = await deleteCourier(id);
    if (error) return toast.error("Ошибка при удалении курьера");
    toast.success("Курьер успешно удален");
  };

  return (
    <div className="page">
      <Action>
        <div className="action_left">
          <Link to="/">
            <AiFillHome />
          </Link>

          <GoDotFill />

          <Link to="/courier">
            <span>Мои курьеры</span>
          </Link>
        </div>
      </Action>

      <div className="page-container courier-container">
        <Table>
          <thead>
            <tr>
              <th>ID курьера</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Город</th>
              <th className="table__del"></th>
            </tr>
          </thead>
          <tbody>
            {couriers?.map((courier) => (
              <tr key={courier?.id}>
                <td>{courier?.code}</td>
                <td>{courier?.fio}</td>
                <td>{courier?.phone}</td>
                <td>{courier?.city?.title}</td>
                <td className="table__del">
                  <button onClick={() => handleDeleteCourier(courier?.code)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <form className="add-courier-form" onSubmit={handleAddCourier}>
          <label>
            <span>ID курьера</span>
            <input
              type="text"
              name="code"
              required
              autoComplete="off"
              placeholder="Поле ввода"
            />
          </label>
          <button>
            <span>Добавить</span>
            <FiPlus />
          </button>
        </form>
      </div>
    </div>
  );
};
