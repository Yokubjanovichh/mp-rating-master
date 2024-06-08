// 2024-01-04T22:50:39.148+00:00

export const date = (date, fromat) => {
  if (!date) return new Date().toLocaleDateString("sv-SE");
  const local = new Date(date);

  // hour format: hh:mm
  const hour = local.toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });

  switch (fromat) {
    case "dd.mm.yyyy":
      return local.toLocaleDateString("ru-RU");
    case "dd.mm.yyyy hh:mm":
      return local.toLocaleDateString("ru-RU") + " / " + hour;

    default:
      return new Date(date).toLocaleString();
  }
};
