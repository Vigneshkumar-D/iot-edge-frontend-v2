// import React from "react";

// const courses = [
//   {
//     name: "React Advance Guide",
//     lessons: 2,
//     duration: "30 mins",
//     difficulty: "EASY",
//     type: "FREE",
//     language: "ENGLISH",
//   },
//   {
//     name: "React Intermediate Guide",
//     lessons: 1,
//     duration: "0 mins",
//     difficulty: "EASY",
//     type: "FREE",
//     language: "ENGLISH",
//   },
//   {
//     name: "React Beginners Guide",
//     lessons: 1,
//     duration: "50 mins",
//     difficulty: "EASY",
//     type: "FREE",
//     language: "ENGLISH",
//   },
// ];

// export default function CourseTable() {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search Course"
//             className="px-4 py-2 border rounded-lg w-64"
//           />
//           <button className="px-4 py-2 border rounded-lg">🔄 Reset</button>
//           <button className="px-4 py-2 border rounded-lg">⇅ Columns</button>
//         </div>
//         <button className="px-4 py-2 bg-black text-white rounded-lg">+ New</button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-100">
//             <tr className="text-gray-600">
//               <th className="px-6 py-3 cursor-pointer">Course ⬍</th>
//               <th className="px-6 py-3 cursor-pointer">No Of Lessons ⬍</th>
//               <th className="px-6 py-3 cursor-pointer">Duration ⬍</th>
//               <th className="px-6 py-3 cursor-pointer">Difficulty ⬍</th>
//               <th className="px-6 py-3 cursor-pointer">Type ⬍</th>
//               <th className="px-6 py-3 cursor-pointer">Language ⬍</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {courses.map((course, i) => (
//               <tr key={i} className="border-t hover:bg-gray-50">
//                 <td className="px-6 py-4">{course.name}</td>
//                 <td className="px-6 py-4">{course.lessons} {course.lessons > 1 ? "lessons" : "lesson"}</td>
//                 <td className="px-6 py-4">{course.duration}</td>
//                 <td className="px-6 py-4">
//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
//                     {course.difficulty}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
//                     {course.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
//                     {course.language}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
//                     ...
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="p-4 flex justify-between text-gray-600 text-sm">
//           <span>Page 1 of 1</span>
//           <div className="flex gap-2">
//             <button className="text-gray-400 cursor-not-allowed">‹ Prev</button>
//             <button className="text-gray-400 cursor-not-allowed">Next ›</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table"; // adjust import path as needed
import { Button } from "./components/ui/button";
import { ListRestart } from "lucide-react";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { CalendarDays, Edit, Eye, Mail, MoreHorizontal, UserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./components/ui/dropdown-menu";

import ViewDialog from "./app/profile/profile-view";
import KidCard from "./app/profile/profile-card";




const courses = [
  {
    name: "React Advance Guide",
    lessons: 2,
    duration: "30 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Intermediate Guide",
    lessons: 1,
    duration: "0 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Beginners Guide",
    lessons: 1,
    duration: "50 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Advance Guide",
    lessons: 2,
    duration: "30 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Intermediate Guide",
    lessons: 1,
    duration: "0 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Beginners Guide",
    lessons: 1,
    duration: "50 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Advance Guide",
    lessons: 2,
    duration: "30 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  },
  {
    name: "React Intermediate Guide",
    lessons: 1,
    duration: "0 mins",
    difficulty: "EASY",
    type: "FREE",
    language: "ENGLISH",
  }

];

const kid = {
  title: "Mr.",
  firstName: "Aryan",
  middleName: "Raj",
  lastName: "Singh",
  gender: "Male",
  dateOfBirth: "2012-08-15",
  email: "aryan.singh@example.com",
  title: "Master",
  firstName: "Aryan",
  middleName: "Raj",
  lastName: "Singh",
  dateOfBirth: "2012-08-15",
  user: {
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "aryan.singh@example.com",
  },
  languages: ["English", "Hindi"],
  ethnicity: "Asian",
  nationality: "Indian",
  avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  guardians: [
    {
      uuid: "guardian-uuid-123",
      title:"Mr.",
      firstName:"Alex",
      lastName:"",
      relationship: "Father",
      guardianType: "PRIMARY",
      user: {
        avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
        email: "aryan.singh@example.com",
      },
    },
    {
      uuid: "guardian-uuid-456",
      title:"Mr.",
      firstName:"Alex",
      lastName:"",
      relationship: "Mother",
      guardianType: "SECONDARY",
      user: {
        avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
        email: "aryan.singh@example.com",
      },
    },
  ],
  organizations: [
    {
      uuid: "org-uuid-001",
      name:"Oxford University",
      identificationNo: "IDN123456",
      isDefault: true,
      logoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      uuid: "org-uuid-002",
      name:"Hogwarts School",
      identificationNo: "IDN654321",
      isDefault: false,
      logoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ],
};

  

export default function CourseTable() {
  return (
    <div style={{display:"flex", flexDirection:"column"}} className="p-6">
      <div style={{width:"350px", alignSelf:"center", margin:"20px"}}>
          <KidCard  kid={kid}/>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-10" >
          <input
            type="text"
            placeholder="Search Course"
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-4 py-2 border rounded-lg">🔄 Reset</button>
          <button className="px-4 py-2 border rounded-lg">⇅ Columns</button>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg">+ New</button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>No Of Lessons</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, i) => (
              <TableRow key={i}>
                <TableCell>{course.name}</TableCell>
                <TableCell>
                  {course.lessons} {course.lessons > 1 ? "lessons" : "lesson"}
                </TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {course.difficulty}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                    {course.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {course.language}
                  </span>
                </TableCell>
                <TableCell>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    ...
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 flex justify-between text-gray-600 text-sm">
          <span>Page 1 of 1</span>
          <div className="flex gap-2">
            <button className="text-gray-400 cursor-not-allowed">‹ Prev</button>
            <button className="text-gray-400 cursor-not-allowed">Next ›</button>
          </div>
        </div>
      </div>
    </div>
  );
}



