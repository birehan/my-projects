import axios from "axios";
import { API_BASE_URL } from "../../../config";

axios.defaults.withCredentials = true;

const transport = axios.create({
  withCredentials: true,
});

export const getAllQuestions = async () => {
  try {
    const { data } = await axios.get(API_BASE_URL + "/api/questions");
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};

export const getQuestionsById = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/questions/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};

export const createQuestions = async (formdata) => {
  try {
    const { data } = await transport.post(
      `${API_BASE_URL}/api/questions`,
      formdata
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};

export const updateQuestions = async (questions) => {
  try {
    const { data } = await transport.put(
      `${API_BASE_URL}/api/questions/${questions.id}`,
      questions
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};

export const deleteQuestions = async (id) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/api/questions/${id}`);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};
