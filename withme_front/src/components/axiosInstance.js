import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  //timeout: 1000, // 요청이 timeout보다 오래 걸리면 요청 중단
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    //config.headers["Authorization"] = accessToken;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    // 로그인, 로그아웃 관련 에러도 401 에러이기 때문에 제외하기 위해
    if (
      error.response.data.code === 1001 ||
      error.response.data.code === 1002
    ) {
      return Promise.reject(error);
    }

    if (status === 401) {
      try {
        // 401이라면 토큰 재발급
        const { data } = await axios({
          method: "post",
          url: `/api/member/reIssue`,
        });

        const newAccessToken = data.tokenType + data.accessToken;

        originalRequest.headers = {
          "Content-Type": "application/json",
          Authorization: newAccessToken,
        };
        localStorage.setItem("accessToken", newAccessToken);

        return await axios(originalRequest);
      } catch (err) {
        // 재발급 실패 시 로그인창으로 이동
        localStorage.removeItem("accessToken");
        alert("로그인을 다시 진행해 주시기 바랍니다.");
        window.location.href = "/member/login";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
