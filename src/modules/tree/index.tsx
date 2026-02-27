import { useState } from "react";
import PopupWrapper from "../form/components/PopupWrapper";
import { Form } from "../form/components/Form";
import PopoverWrapper from "../form/components/PopoverWrapper";
import TestFive from "./components/TestFive";

const MyTree = () => {
  const [popup, setPopup] = useState({ data: {}, state: false });
  const [popover, setPopover] = useState(false);
  return (
    <div>
      <FamilyTree setPopup={setPopup} popup={popup} setPopover={setPopover} />

      <PopupWrapper
        open={popup?.state}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <Form popup={popup} />
      </PopupWrapper>

      <PopoverWrapper open={popover} onOpenChange={() => setPopover(false)}>
        <div>
          <ul>
            <li>a</li>
            <li>b</li>
            <li>c</li>
          </ul>
        </div>
      </PopoverWrapper>
    </div>
  );
};

export default MyTree;

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
      {/* <TestThree setPopup={setPopup} popup={popup} setPopover={setPopover} /> */}
      <TestFive setPopup={setPopup} popup={popup} setPopover={setPopover} />
      {/* <TestFour setPopup={setPopup} popup={popup} setPopover={setPopover} /> */}
    </>
  );
};

//
