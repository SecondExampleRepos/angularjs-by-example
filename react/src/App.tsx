import axios from 'axios';

export const getPremieres = async () => {

  try {
    const response = await axios.get('/api/premieres');
    return response.data;
  } catch (error) {

  try {
    const response = await axios.get('/api/popular');
    return response.data;
  } catch (error) {

  try {
    const response = await axios.get(`/api/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error);
    return null;
  }
};
    return [];
  }
};
    return [];
  }
};
  return [];
};

export const getPopular = async () => {

  try {
    const response = await axios.get('/api/popular');
    return response.data;
  } catch (error) {

  try {
    const response = await axios.get(`/api/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error);
    return null;
  }
};
    return [];
  }
};
  return [];
};

export const getShow = async (id: string) => {

  try {
    const response = await axios.get(`/api/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error);
    return null;
  }
};
  return null;
};
