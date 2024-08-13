import React, { useState } from "react";
import { FaPlus, FaShareAlt } from "react-icons/fa";
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";
import useAllTests from "../../hooks/useAllTests";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/axiosSecure";
import Swal from "sweetalert2";

const CreateTest = () => {
  const [createModal, setCreateModal] = useState(false);

  const handleCreateModal = () => setCreateModal(!createModal);

  const [allTests, loadingAllTest, refetchAllTests] = useAllTests();

  const [axiosSecure] = useAxiosSecure();

  const handleTestRemove = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tests/remove?testId=${id}`);
          const data = res?.data;

          if (data?.success) {
            refetchAllTests();
            Swal.fire({
              title: "Deleted!",
              text: data?.message,
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Test delete Error:", error);

          Swal.fire({
            title: "Not Deleted!",
            text: "Your test has been not deleted.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="py-5 px-2">
      <h2 className="text-2xl uppercase font-semibold text-center">
        All your tests
      </h2>
      <div className="mt-2 flex justify-between items-center bg-red-200 sm:px-3 px-2 py-2 uppercase">
        <h3 className="font-medium sm:text-base text-xs">test room</h3>
        <p className="text-xs">Total - {allTests?.length}</p>
        <button
          onClick={handleCreateModal}
          className="flex items-center gap-1 uppercase sm:text-sm text-xs px-2 bg-red-800 text-white py-1 rounded-"
        >
          <FaPlus className="text-xs" /> Create
        </button>
      </div>
      <section className="mt-2">
        {loadingAllTest && (
          <div className="flex justify-center mt-10">
            <LoadingAnimation />
          </div>
        )}
        <div className="space-y-2">
          {allTests.map((value) => {
            const { _id, testName, testId } = value;

            return (
              <div
                key={_id}
                className="p-3 bg-red-800 text-white flex justify-between items-center"
              >
                <h4 className="md:text-lg font-medium">{testName}</h4>
                <div className="gap-2 flex items-center">
                  <p className="md:block hidden">Room : {testId}</p>
                  <button className="bg-green-200 hover:bg-slate-200 text-green-800 p-1 rounded">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleTestRemove(testId)}
                    className="bg-white hover:bg-slate-200 p-1 rounded"
                    title="Delete"
                  >
                    <AiFillDelete className="text-red-600" />
                  </button>
                  <Link
                    to={`/create-quiz/${testId}`}
                    className="py-2 bg-black hover:bg-slate-600 px-2 rounded text-xs"
                  >
                    VIEW
                  </Link>
                  <button
                    className="bg-white hover:bg-slate-200 p-1 rounded"
                    title="Share"
                  >
                    <FaShareAlt className="text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <>
        {createModal && (
          <CreateTestModal handleCreateModal={handleCreateModal} refetchAllTests={refetchAllTests} />
        )}
      </>
    </div>
  );
};

export default CreateTest;
