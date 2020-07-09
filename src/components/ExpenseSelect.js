// import React from "react";

// const ExpenseSelect = (props) => {
//   function getUnique(arr, comp) {
//     const unique = arr
//       .map((e) => e[comp])
//       .map((e, i, final) => final.indexOf(e) === i && i)
//       .filter((e) => arr[e])
//       .map((e) => arr[e]);
//     return unique;
//   }

//   let uniqueCategory = getUnique(props.orgs, "category");
//   <div className="form-label-group">
//     <select value={props.orgs} onChange={props.handleChange}>
//       {uniqueCategory.map((org) => (
//         <option key={org.id} value={org.category}>
//           {org.category}
//         </option>
//       ))}
//     </select>
//     ;
//   </div>;
// };

// export default ExpenseSelect;
