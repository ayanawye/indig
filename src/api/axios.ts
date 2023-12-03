import axios from "axios";

export const BASE_URL = "https://dpg.gg/test/calendar.json";

export const getData = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};
