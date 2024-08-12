import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";

const useAllTests = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: allTests = [], isLoading: loadingAllTest, refetch: refetchAllTests } = useQuery({
    queryKey: ["allTests"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/tests/show-all`
      );
      const data = res.data;
      if (data.success) {
        return data.data;
      }
    },
  });

  return [allTests, loadingAllTest, refetchAllTests];
};

export default useAllTests;