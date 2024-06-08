import React, { useMemo, Fragment, useState } from "react";
import { Action } from "../../Components/Action/Action";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { Table } from "../../Components/Table/Table";
import { status } from "../../Utility/status";
import { AddReview } from "./AddReview";
import { ReadReview } from "./ReadReview";
import { VideoReview } from "./VideoReview";
import { PhotoReview } from "./PhotoReview";
import { useGetOneTsQuery } from "../../Context/ts.service";

export const Ts = () => {
  const { id } = useParams();
  const data = generateMockData(20);
  const [addreview, setAddreview] = useState(false);
  const [readreview, setReadreview] = useState(false);
  const [videoreview, setVideoReview] = useState(false);
  const [photorreview, setPhotoReview] = useState(false);

  const { data: ts } = useGetOneTsQuery(id);

  console.log(ts);

  const columns = useMemo(() => {
    return data?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.date}</td>
          <td>{item.id_agent}</td>
          <td className="table-btn" onClick={() => setVideoReview(item)}>
            Видео
          </td>
          <td>{status(item.status_ransom)}</td>
          <td>{item.date_delivery}</td>
          <td>Забрали</td>
          <td className="table-btn" onClick={() => setAddreview(item)}>
            Купить
          </td>
          <td className="table-btn" onClick={() => setReadreview(item)}>
            Просмотр
          </td>
          <td className="table-btn" onClick={() => setPhotoReview(item)}>
            Фото
          </td>
          <td>{status(item.status_review)}</td>
          <td>{item.dispute}</td>
        </tr>
      );
    });
  }, [data]);

  return (
    <Fragment>
      <AddReview addreview={addreview} setAddreview={setAddreview} />
      <ReadReview readreview={readreview} setReadreview={setReadreview} />
      <VideoReview videoreview={videoreview} setVideoReview={setVideoReview} />
      <PhotoReview
        photorreview={photorreview}
        setPhotoReview={setPhotoReview}
      />
      <div className="page">
        <Action>
          <div className="action_left">
            <Link to="/">
              <AiFillHome />
            </Link>
            <GoDotFill />
            <Link to={`/ts/${id}`}>Статус ТЗ: {id}</Link>
          </div>
        </Action>

        <div className="page-container">
          <Table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>ID агента</th>
                <th>Отчет выкупа </th>
                <th>Статус выкупа</th>
                <th>Дата доставки</th>
                <th>Статус забора</th>
                <th>Отзыв</th>
                <th>Текст отзыва</th>
                <th>Отчёт отзывы</th>
                <th>Статус отзыва</th>
                <th>Спор</th>
              </tr>
            </thead>
            <tbody>{columns}</tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

function generateMockData(count) {
  const data = [];
  const st = ["Принято", "Отклонено"];
  const sp = ["Написать модератору", "Спор открыт", "Спор закрыт"];
  for (let i = 0; i < count; i++) {
    data.push({
      date: new Date().toLocaleDateString(),
      id_agent: Math.floor(Math.random() * 10000),
      ransom_report: Math.floor(Math.random() * 1000),
      status_ransom: st[Math.floor(Math.random() * 2)],
      date_delivery: new Date().toLocaleDateString(),
      status_pickup: Math.floor(Math.random() * 2),
      review: Math.floor(Math.random() * 1121),
      review_text: `lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`,
      report_review: Math.floor(Math.random() * 1000),
      status_review: st[Math.floor(Math.random() * 2)],
      dispute: sp[Math.floor(Math.random() * 3)],
    });
  }
  return data;
}
