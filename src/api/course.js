import { catchError, getToken } from "../utils/helper";
import client from "./client";


// simple API calls To make  requests
// we just need to pass in the URL endpoint as an argument and certain other parameters


//......................................  Upload Trailer     .....................................................

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/course/upload-trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        //inside form data we will have files as well
        "content-type": "multipart/form-data",
      },
      // our  method to get progress value
      // inside total we will have the actaul size of the data
      // inside loaded we will have how much data that we just uploaded to our server
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          // we will get this value in percentage form
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (error) {
    return catchError(error);

    
  }
};

//......................................  Upload Course    .....................................................

export const uploadCourse = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/course/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Get Course For Update    .....................................................

export const getCourseForUpdate = async (id) => {
  const token = getToken();
  try {
    const { data } = await client("/course/for-update/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Update Course   .....................................................

export const updateCourse = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch("/course/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Get Courses    .....................................................

export const getCourses = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/course/courses?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Delete Course   .....................................................

export const deleteCourse = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/course/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Search Course For Admin    .....................................................

export const searchCourseForAdmin = async (title) => {
  const token = getToken();
  try {
    const { data } = await client(`/course/search?title=${title}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Get Top Rated Courses   .....................................................

export const getTopRatedCourses = async (type, signal) => {
  try {
    let endpoint = "/course/top-rated";
    if (type) endpoint = endpoint + "?type=" + type;

    const { data } = await client(endpoint, { signal });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Get Latest Uploads    .....................................................

export const getLatestUploads = async (signal) => {
  try {
    const { data } = await client("/course/latest-uploads", { signal });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Get Single Course   .....................................................

export const getSingleCourse = async (id) => {
  try {
    const { data } = await client("/course/single/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Get Related Courses    .....................................................

export const getRelatedCourses = async (id) => {
  try {
    const { data } = await client("/course/related/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

//......................................  Search Public Courses    .....................................................

export const searchPublicCourses = async (title) => {
  try {
    const { data } = await client("/course/search-public?title=" + title);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
