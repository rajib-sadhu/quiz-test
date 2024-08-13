import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaPlus, FaShareAlt } from "react-icons/fa";
import CreateTestModal from "../../components/CreateTestModal/CreateTestModal";
import useAllTests from "../../hooks/useAllTests";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

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
                  <button className="bg-white hover:bg-slate-200 p-1 rounded" title="Delete">
                    <AiFillDelete className="text-red-600" />
                  </button>
                  <Link
                    to={`/create-quiz/${testId}`}
                    className="py-2 bg-black hover:bg-slate-600 px-2 rounded text-xs"
                  >
                    VIEW
                  </Link>
                  <button className="bg-white hover:bg-slate-200 p-1 rounded" title="Share">
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
          <CreateTestModal handleCreateModal={handleCreateModal} />
        )}
      </>
    </div>
  );
};

export default CreateTest;
