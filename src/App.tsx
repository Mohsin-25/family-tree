import { useState } from "react";
import "./App.css";
import { Form } from "./modules/form/components/Form";
import PopupWrapper from "./modules/form/components/PopupWrapper";
import FamilyTree from "./modules/tree";
import PopoverWrapper from "./modules/form/components/PopoverWrapper";

function App() {
  const [popup, setPopup] = useState({ data: {}, state: false });
  return (
    <>
      <FamilyTree setPopup={setPopup} popup={popup} />

      <PopupWrapper
        open={popup?.state}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <Form />
      </PopupWrapper>
      <PopoverWrapper
        open={popup?.state}
        onOpenChange={() => setPopup({ data: {}, state: false })}
      >
        <Form />
      </PopoverWrapper>
    </>
  );
}

export default App;
