import { useState } from "react";
import "./App.css";
import { Form } from "./modules/form/components/Form";
import PopupWrapper from "./modules/form/components/PopupWrapper";
import FamilyTree from "./modules/tree";
import PopoverWrapper from "./modules/form/components/PopoverWrapper";

function App() {
  const [popup, setPopup] = useState({ data: {}, state: false });
  const [popover, setPopover] = useState(false);
  return (
    <>
      <FamilyTree setPopup={setPopup} popup={popup} setPopover={setPopover} />

      <PopupWrapper
        open={popup?.state}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <Form />
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
    </>
  );
}

export default App;
