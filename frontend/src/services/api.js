import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Projects API
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API}/projects`);
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProject = async (id) => {
  try {
    const response = await axios.get(`${API}/projects/${id}`);
    return response.data.project;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Testimonials API
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API}/testimonials`);
    return response.data.testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

// Equipment API
export const getEquipment = async () => {
  try {
    const response = await axios.get(`${API}/equipment`);
    return response.data.equipment;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw error;
  }
};

// Contact API
export const submitContact = async (contactData) => {
  try {
    const response = await axios.post(`${API}/contact`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};
