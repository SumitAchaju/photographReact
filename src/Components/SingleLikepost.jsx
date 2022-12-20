import axios from 'axios';
import useAxios from '../utils/useAxios';

export default function useSingleLikePost(setSinglePost,url) {
    let cancelToken;
    const api = useAxios();
    const likePost = (postid, action, event) => {
      const element = event.target;
      if (
        element.classList.contains("bi-bookmark") ||
        element.classList.contains("bi-bookmark-fill")
      ) {
        if (element.classList.contains("bi-bookmark")) {
          action = "save";
          element.classList.remove("bi-bookmark");
          element.classList.add("bi-bookmark-fill");
        } else {
          action = "unsave";
          element.classList.remove("bi-bookmark-fill");
          element.classList.add("bi-bookmark");
        }
      } else if (
        element.classList.contains("bi-heart") ||
        element.classList.contains("bi-heart-fill")
      ) {
        if (element.classList.contains("bi-heart")) {
          action = "like";
          element.classList.remove("bi-heart");
          element.classList.add("bi-heart-fill");
          element.style.color = "red";
        } else {
          action = "unlike";
          element.classList.remove("bi-heart-fill");
          element.classList.add("bi-heart");
          element.style.color = "white";
        }
      }
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();
      api
        .post(
          `postlikeout/${postid}`,
          {
            action: `${action}`,
          },
          { cancelToken: cancelToken.token }
        )
        .then((res) => {
          if (res.data.status === "success") {
            api
              .get(url)
              .then((res) => setSinglePost(res.data));
          }
        });
    };
    return likePost
}
