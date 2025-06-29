import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table";
import KidCard from "./app/profile/profile-card";
import { Form } from "./components/ui/form";
import LoginForm from "./login-form";

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
];

const kid = {
  title: "Master",
  firstName: "Aryan",
  middleName: "Raj",
  lastName: "Singh",
  gender: "Male",
  dateOfBirth: "2012-08-15",
  email: "aryan.singh@example.com",
  avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  user: {
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "aryan.singh@example.com",
  },
  languages: ["English", "Hindi"],
  ethnicity: "Asian",
  nationality: "Indian",
  guardians: [],
  organizations: [],
};

const CourseTable = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", alignSelf:"center", width:"100%" }} >
      {/* <div style={{ width: "50%", alignSelf: "center" }}> */}
        <KidCard kid={kid} />
      {/* </div> */}
    
      {/* <div style={{width:"50%",  alignSelf:'center'}}> */}
        <div style={{width:"300px"}}>
          <LoginForm />
          </div>
      {/* </div> */}

      {/* <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
            {courses.map((course, index) => (
              <TableRow key={index}>
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
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-8 h-8 leading-[1] flex items-center justify-center">
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
      </div> */}
    </div>
  );
};

export default CourseTable;
