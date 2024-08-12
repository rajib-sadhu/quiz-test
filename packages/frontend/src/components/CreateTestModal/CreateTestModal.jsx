import moment from "moment";
import { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import toast from "react-hot-toast";
import { FaRegWindowClose } from "react-icons/fa";

const CreateTestModal = ({ handleCreateModal }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const isValidDate = (current) => {
    return current.isSameOrAfter(moment());
  };

  const handleCreateTest = (e) => {
    e.preventDefault();

    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    const form = e.target;
    const testName = form.testName.value;
    const testDescription = form.testDescription.value;
    const testDuration = form.testDuration.value;
    const testMark = form.testMark.value;
    const testNegativeMark = form.testNegativeMark.value;

    if (!testName) {
      return toast.error("Please enter test name.");
    } else if (!testDescription) {
      return toast.error("Please enter test description.");
    } else if (!testDuration) {
      return toast.error("Please enter test time duration.");
    } else if (!testMark || !testNegativeMark) {
      return toast.error("Please enter test marks and negative marks.");
    }
    //  else if (!startDate || !endDate) {
    //   return toast.error("Please enter test date and time.");
    // } else if (endMoment.isSameOrBefore(startMoment)) {
    //   return toast.error("End Date/Time must be after the Start Date/Time!");
    // }

    // console.log("Start Date:", startMoment.format("YYYY-MM-DD HH:mm:ss"));
    // console.log("End Date:", endMoment.format("YYYY-MM-DD HH:mm:ss"));
    // console.log("Tags:", tags);

    const createTestData = {
      testName,
      testDescription,
      testDuration: parseInt(testDuration),
      testMark: parseInt(testMark),
      testNegativeMark: parseInt(testNegativeMark),
      startDate: startDate?.format("YYYY-MM-DD HH:mm:ss") || null,
      endDate: endDate?.format("YYYY-MM-DD HH:mm:ss") || null,
      tags,
    };

    console.log(createTestData);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() !== "") {
        setTags((prevTags) => [...prevTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-brightness-75 backdrop-blur-[1.5px] flex justify-center sm:items-center sm:mt-0 mt-14 px-2">
      <div className="bg-red-200 p-4 relative">
        <FaRegWindowClose
          className="absolute right-2 top-2 cursor-pointer"
          onClick={handleCreateModal}
          title="Close"
        />
        <h3 className="text-lg uppercase font-medium mb-2 text-center">
          Create Test
        </h3>
        <form onSubmit={handleCreateTest}>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <div className="space-y-2">
              <input
                type="text"
                className="px-2 py-1 w-full"
                placeholder="Write your test name"
                name="testName"
              />
              <textarea
                name="testDescription"
                placeholder="Write Description"
                className="w-full min-h-32 px-2 py-1"
              ></textarea>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <label className="font-medium">test time duration: </label>
                <input
                  type="number"
                  name="testDuration"
                  min={1}
                  className="w-20 px-2"
                />{" "}
                <span
                  className="cursor-pointer"
                  title="Please enter test time duration in minutes"
                >
                  min
                </span>
              </div>

              <div className="flex gap-2">
                <label className="font-medium">Number per question: </label>
                <input
                  type="number"
                  name="testMark"
                  min={1}
                  defaultValue={1}
                  className="w-20 px-2"
                />{" "}
                <span className="cursor-pointer" title="">
                  no.
                </span>
              </div>

              <div className="flex gap-2">
                <label className="font-medium">Negative per question: </label>
                <input
                  type="number"
                  name="testNegativeMark"
                  min={0}
                  defaultValue={0}
                  className="w-20 px-2"
                />{" "}
                <span className="cursor-pointer" title="">
                  no.
                </span>
              </div>

              <div className="flex gap-2">
                <label className="font-medium text-nowrap">
                  test link start:{" "}
                </label>
                <Datetime
                  isValidDate={isValidDate}
                  value={startDate}
                  onChange={(date) => setStartDate(moment(date))}
                  className=""
                />
              </div>

              <div className="flex gap-2">
                <label className="font-medium text-nowrap">
                  test link end:{" "}
                </label>
                <Datetime
                  isValidDate={isValidDate}
                  value={endDate}
                  onChange={(date) => setEndDate(moment(date))}
                  className=""
                />
              </div>

              <div className="flex gap-2">
                <label className="font-medium text-nowrap">Add Tags: </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
                  className="px-2 py-1 outline-none bg-white border-b border-black w-full"
                  placeholder="Press Enter to add tags"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-white hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-red-800 text-white px-3 py-1 rounded-sm block sm:w-auto w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestModal;
