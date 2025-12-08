import TestThree from "./components/TestThree";

const FamilyTree = ({
  setPopup,
  popup,
  setPopover,
}: {
  setPopup?: any;
  popup?: any;
  setPopover?: any;
}) => {
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
