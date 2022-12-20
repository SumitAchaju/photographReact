import { useEffect, useState, useContext } from "react";
import axios from "axios";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

export default function useInfiniteScroll(url, level) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPost, setTotalPost] = useState();
  const api = useAxios();
  let { edited,authToken } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    api
      .get(
        url,
        { params: { level: level } },
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        setHasMore(`${res.data.post.length}` !== `${res.data.results}`);
        setPosts(res.data.post);
        setLoading(false);
        setTotalPost(res.data.results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [url, level, edited,authToken]);

  return { loading, error, posts, hasMore, setPosts, totalPost };
}
