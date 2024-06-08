import i1 from "./icon/State=Active.svg";
import i2 from "./icon/State=Done.svg";
import i3 from "./icon/State=Draft.svg";
import i4 from "./icon/State=Process.svg";
import i5 from "./icon/State=Stop.svg";

export const status = (status) => {
  switch (status) {
    case "Активна":
      return (
        <span>
          <img src={i1} alt="" /> {status}
        </span>
      );

    case "Завершена":
      return (
        <span>
          <img src={i2} alt="" /> {status}
        </span>
      );

    case "Черновик":
      return (
        <span>
          <img src={i3} alt="" /> {status}
        </span>
      );

    case "В процессе":
      return (
        <span>
          <img src={i4} alt="" /> {status}
        </span>
      );

    case "Остановлена":
      return (
        <span>
          <img src={i5} alt="" /> {status}
        </span>
      );

    case "Принято":
      return (
        <span>
          <img src={i1} alt="" /> {status}
        </span>
      );

    case "Отклонено":
      return (
        <span>
          <img src={i5} alt="" /> {status}
        </span>
      );

    default:
      return status;
  }
};
