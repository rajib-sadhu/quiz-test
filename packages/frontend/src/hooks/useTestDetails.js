import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";

const useTestDetails = (id) => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: testDetails = [],
    isLoading: loadingTest,
    refetch: refetchTestDetails,
  } = useQuery({
    queryKey: ["testDetails"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/tests/show?testId=${id}`);
      const data = res.data;
      if (data.success) {
        return data.data[0];
      }
    },
  });

  return [testDetails, loadingTest, refetchTestDetails];
};

export default useTestDetails;
