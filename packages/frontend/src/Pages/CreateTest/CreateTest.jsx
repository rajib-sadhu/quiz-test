import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";
import useAllTests from "../../hooks/useAllTests";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const CreateTest = () => {
  const { user } = useAuth();

  const [createModal, setCreateModal] = useState(false);

  const handleCreateModal = () => setCreateModal(!createModal);

  const [allTests, loadingAllTest] = useAllTests();

  return (
    <div className="py-5 px-2">
      <h2 className="text-2xl uppercase font-semibold text-center">
        All your tests
      </h2>
      <div className="mt-2 flex justify-between items-center bg-red-200 px-3 py-2 uppercase">
        <h3 className=" font-medium ">{user?.displayName} test room</h3>
        <button
          onClick={handleCreateModal}
          className="flex items-center gap-1 uppercase text-sm px-2 bg-red-800 text-white py-1 rounded-"
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
            const {
              _id,
              testName,
              testDescription,
              testDuration,
              testMark,
              testNegativeMark,
              startDate,
              endDate,
              tags,
              testId,
              owner,
            } = value;

            return (
              <div
                key={_id}
                className="p-3 bg-red-800 text-white flex justify-between items-center"
              >
                <h4 className="text-lg font-medium">{testName}</h4>
                <div className="gap-2 flex items-center">
                  <p className="md:block hidden">Room : {testId}</p>
                  <button className="bg-green-200 text-green-800 p-1 rounded">
                    <FiEdit />
                  </button>
                  <button className="bg-white p-1 rounded" title="Delete">
                    <AiFillDelete className="text-red-600" />
                  </button>
                  <button className="p-1 bg-black px-2 rounded text-sm">
                    VIEW
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <>
        {createModal && (
          <CreateTestModal handleCreateModal={handleCreateModal} />
        )}
      </>
    </div>
  );
};

export default CreateTest;
