// import Tree from "react-d3-tree";
// import { getFamilyTree } from "../services/service";
// import { useParams } from "@tanstack/react-router";

// const TestFive = ({
//   setPopup,
// }: // popup,
// // setPopover,
// {
//   setPopup?: any;
//   popup?: any;
//   setPopover?: any;
// }) => {
//   const { id } = useParams({ from: "/myTree/$id" });

//   const { treeData } = getFamilyTree(id);

//   // const data = {
//   //   meta: {
//   //     rootMemberIds: ["69a193ab4690535e017b4797", "696e325d7673e533e1040d02"],
//   //     connectedPeopleCount: 7,
//   //     disConnectedPeopleCount: 0,
//   //     totalCount: 7,
//   //   },
//   //   connectedPeople: [
//   //     {
//   //       _id: "696e32107673e533e1040cfc",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Mohsin",
//   //       gender: "M",
//   //       maritalStatus: "Single",
//   //       dob: "25-08-1998",
//   //       profession: "Dev",
//   //       children: [],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-01-19T13:30:56.196Z",
//   //       updatedAt: "2026-02-27T08:08:14.772Z",
//   //       __v: 1,
//   //       updatedBy: "696b739b639872df24d47569",
//   //       mother: "696e325d7673e533e1040d02",
//   //       spouse: null,
//   //       father: "696e32417673e533e1040d00",
//   //     },
//   //     {
//   //       _id: "696e32287673e533e1040cfe",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Wasim",
//   //       gender: "M",
//   //       maritalStatus: "M",
//   //       dob: "09-03-1995",
//   //       profession: "Manager",
//   //       children: [],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-01-19T13:31:20.750Z",
//   //       updatedAt: "2026-02-27T08:08:14.758Z",
//   //       __v: 0,
//   //       father: "696e32417673e533e1040d00",
//   //       mother: "696e325d7673e533e1040d02",
//   //       spouse: "698f68d133a062c5cc37595c",
//   //     },
//   //     {
//   //       _id: "696e32417673e533e1040d00",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Fahim",
//   //       gender: "M",
//   //       maritalStatus: "M",
//   //       dob: "05-01-1959",
//   //       profession: "Teacher",
//   //       children: ["696e32287673e533e1040cfe", "696e32107673e533e1040cfc"],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-01-19T13:31:45.608Z",
//   //       updatedAt: "2026-02-27T12:53:38.092Z",
//   //       __v: 9,
//   //       father: "69a193ab4690535e017b4797",
//   //       mother: null,
//   //       spouse: "696e325d7673e533e1040d02",
//   //     },
//   //     {
//   //       _id: "696e325d7673e533e1040d02",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Shahenaz",
//   //       gender: "F",
//   //       maritalStatus: "M",
//   //       dob: "01-07-1967",
//   //       profession: "House wife",
//   //       children: ["696e32287673e533e1040cfe", "696e32107673e533e1040cfc"],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-01-19T13:32:13.249Z",
//   //       updatedAt: "2026-02-27T08:08:14.787Z",
//   //       __v: 10,
//   //       father: null,
//   //       mother: null,
//   //       spouse: "696e32417673e533e1040d00",
//   //     },
//   //     {
//   //       _id: "698f68d133a062c5cc37595c",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Anam",
//   //       gender: "F",
//   //       maritalStatus: "M",
//   //       dob: "25-04-1998",
//   //       profession: "S",
//   //       children: [],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-02-13T18:09:21.725Z",
//   //       updatedAt: "2026-02-27T08:06:05.042Z",
//   //       __v: 0,
//   //       spouse: "696e32287673e533e1040cfe",
//   //       father: null,
//   //       mother: null,
//   //     },
//   //     {
//   //       _id: "69a193ab4690535e017b4797",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Abdul Razzaque",
//   //       gender: "M",
//   //       maritalStatus: "M",
//   //       dob: "01-01-1935",
//   //       profession: "Head master",
//   //       children: ["696e32417673e533e1040d00", "69a1a4184690535e017b479f"],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-02-27T12:52:59.667Z",
//   //       updatedAt: "2026-02-27T14:03:42.397Z",
//   //       __v: 2,
//   //     },
//   //     {
//   //       _id: "69a1a4184690535e017b479f",
//   //       treeId: "696b8d9b25aadc4d4fa370d8",
//   //       name: "Arsala",
//   //       gender: "F",
//   //       maritalStatus: "M",
//   //       dob: "01-01-1955",
//   //       profession: "House wife",
//   //       children: [],
//   //       createdBy: "696b739b639872df24d47569",
//   //       createdAt: "2026-02-27T14:03:04.351Z",
//   //       updatedAt: "2026-02-27T14:03:42.404Z",
//   //       __v: 0,
//   //       father: "69a193ab4690535e017b4797",
//   //     },
//   //   ],
//   //   disConnectedPeople: [],
//   // };

//   const getPersonById = (id: any) => {
//     return treeData?.connectedPeople?.filter(
//       (item: any) => item?._id === id,
//     )?.[0];
//   };

//   const getStructuredPerson = (obj: any) => {
//     return {
//       name: obj?.name,
//       attributes: {
//         type: obj?.spouse ? "couple" : "single",
//         person: {
//           id: obj?._id,
//           data: getPersonById(obj?._id),
//         },
//         spouse: obj?.spouse
//           ? {
//               id: obj?.spouse,
//               data: getPersonById(obj?.spouse),
//             }
//           : null,
//       },
//       children: obj?.children?.length
//         ? obj?.children?.map((itm: any) =>
//             getStructuredPerson(getPersonById(itm)),
//           )
//         : [],
//     };
//   };

//   const rootPersonId =
//     treeData?.meta?.rootMemberIds?.find(
//       (item: any) =>
//         getPersonById(item)?.gender === "M" && !getPersonById(item)?.father,
//     ) ||
//     treeData?.meta?.rootMemberIds?.find(
//       (item: any) =>
//         getPersonById(item)?.gender === "F" && !getPersonById(item)?.father,
//     );

//   const structuredData = getStructuredPerson(getPersonById(rootPersonId));

//   return (
//     <div className="bg-background-100 h-[calc(100vh-65px)] " id="">
//       <Tree
//         data={structuredData}
//         collapsible={true}
//         /////////////////////
//         orientation="vertical"
//         zoomable={true} // enable mousewheel zoom
//         draggable={true} // enable click+drag panning
//         translate={{ x: 700, y: 100 }} // initial position
//         zoom={0.5} // initial zoom level
//         nodeSize={{ x: 300, y: 300 }}
//         onNodeClick={() => alert("yeet")}
//         separation={{ siblings: 2, nonSiblings: 2 }}
//         pathFunc={"step"}
//         onLinkClick={() => alert("yeet")}
//         /////////////////////
//         renderCustomNodeElement={({ nodeDatum, toggleNode }) => {
//           const { type, person, spouse } = nodeDatum.attributes || {};

//           return (
//             <foreignObject
//               width={300}
//               height={150}
//               x={type === "couple" ? -150 : -60}
//               y={-60}
//             >
//               <div onClick={toggleNode}>
//                 {" "}
//                 {/* ✅ THIS enables collapse */}
//                 {type === "couple" ? (
//                   <CoupleNode
//                     allData={nodeDatum.attributes}
//                     person={person}
//                     spouse={spouse}
//                     setPopup={setPopup}
//                   />
//                 ) : (
//                   <SingleNode
//                     allData={nodeDatum.attributes}
//                     person={person}
//                     setPopup={setPopup}
//                   />
//                 )}
//               </div>
//             </foreignObject>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default TestFive;

// const CoupleNode = ({
//   allData,
//   person,
//   spouse,
//   setPopup,
// }: // popup,
// // setPopover,
// {
//   allData?: any;
//   person?: any;
//   spouse?: any;
//   setPopup?: any;
//   popup?: any;
//   setPopover?: any;
// }) => {
//   return (
//     <div className="flex items-center justify-between rounded-xl cursor-pointer">
//       {/* person */}
//       <SingleNode allData={allData} person={person} setPopup={setPopup} />

//       <div className="h-0.5 w-13 mt-0 bg-black/50 rounded-full"></div>

//       {/* spouse */}
//       <SingleNode
//         allData={allData}
//         person={spouse}
//         setPopup={setPopup}
//         isSpouse
//       />
//     </div>
//   );
// };

// const SingleNode = ({
//   allData,
//   person,
//   isSpouse = false,
//   setPopup,
// }: // popup,
// {
//   allData: any;
//   person: any;
//   isSpouse?: any;
//   setPopup?: any;
//   popup?: any;
// }) => (
//   <div
//     className={`relative bg-white border px-4 py-3 rounded-xl shadow-md flex flex-col items-center w-[140px] ${
//       isSpouse && "bg-blue-100!"
//     }`}
//   >
//     <button
//       className="bg-red-500 w-5 h-5 text-white flex items-center justify-center rounded ml-18"
//       onClick={(e) => {
//         e.stopPropagation();
//         setPopup({ data: person, state: true });
//       }}
//     >
//       +
//     </button>
//     <img
//       src={
//         "https://media.istockphoto.com/id/1473780957/vector/default-avatar-profile-user-profile-icon-business-people-profile-picture-portrait-user.jpg?s=2048x2048&w=is&k=20&c=0WrcouAz2sHJscVO004qoRnNXLXDCFF18kje2Rl7nRA="
//       }
//       className="w-12 h-12 rounded-full object-cover mb-1"
//     />
//     <p className="text-sm font-medium">{person?.data?.name}</p>
//   </div>
// );
