import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";

const useShowQuiz = (id) => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: showQuiz = [],
    isLoading: loadingAllQuiz,
    refetch: refetchShowQuiz,
  } = useQuery({
    queryKey: ["ShowQuiz"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/quiz/show?testId=${id}`);
      const data = res.data;
      if (data.success) {
        return data.data;
      }
    },
  });

  return [showQuiz, loadingAllQuiz, refetchShowQuiz];
};

export default useShowQuiz;
