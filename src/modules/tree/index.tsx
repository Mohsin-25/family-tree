import TestThree from "./components/TestThree";

const FamilyTree = ({ setPopup, popup, setPopover }) => {
  return (
    <>
      {/* <TestOne /> */}
      {/* <TestTwo /> */}
      <TestThree setPopup={setPopup} popup={popup} setPopover={setPopover} />
    </>
  );
};

export default FamilyTree;
//
