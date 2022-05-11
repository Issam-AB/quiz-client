import axios from "axios";

export const BASE_URL = "https://the-trivia-api.com/api/questions";

export const ENDPOINTS = {
  participant: "participant",
  question: "question",
  getAnswers: "question/getanswers",
};

export const createAPIEndpoint = (endpoint) => {
  //   let url = BASE_URL + "api/" + endpoint + "/";
  let url = BASE_URL;
  return {
    fetch: () => axios.get(url),
    // fetchById: (id) => axios.get(url + id),
    // post: (newRecord) => axios.post(url, newRecord),
    // put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    // delete: (id) => axios.delete(url + id),
  };
};
