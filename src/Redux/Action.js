import { FAIL_REQUESR, GET_STUDENT_LIST, MAKE_REQUESR } from "./ActionType"

export const makeRequest=()=>{
    return {
        type:MAKE_REQUESR
    }
}
export const failRequest =(err) => {
    return{
        type: FAIL_REQUESR,
        payload: err
    }
}
export const getStudentList =(data) => {
    return{
        type: GET_STUDENT_LIST,
        payload: data
    }
}

export const fetchStudentList = () => async (dispatch) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    dispatch(makeRequest());
    try {
      const response = await fetch(baseUrl + `GetAllStudent`);
      
      const result = await response.json();
    //   const data = result.data || [];
      dispatch(getStudentList(result));
    } catch (error) {
      console.error("Error loading data:", error);
      dispatch(failRequest(error));
    }
  };