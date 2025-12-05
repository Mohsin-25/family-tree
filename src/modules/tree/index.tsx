import TestThree from "./components/TestThree";

const FamilyTree = ({ setPopup, popup }) => {
  return (
    <>
      {/* <TestOne /> */}
      {/* <TestTwo /> */}
      <TestThree setPopup={setPopup} popup={popup} />
    </>
  );
};

export default FamilyTree;
//
