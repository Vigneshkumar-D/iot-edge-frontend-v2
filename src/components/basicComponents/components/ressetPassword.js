// import React, { useState } from "react";

// import {
//   Button,
//   Form,
//   Grid,
//   Input,
//   message,
//   Spin,
//   theme,
// } from "antd";

// import { ArrowRightOutlined, LockOutlined, SyncOutlined } from "@ant-design/icons";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import ResetPasswordService from "../service/defaultService/authentication/resetPasswordService";

// const { useToken } = theme;
// const { useBreakpoint } = Grid;

// export default function ResetPassword() {
//   const [searchParams] = useSearchParams();

//   // Get the value of the 'token' query parameter
//   const reset_token = searchParams.get("token")?.replace(/'/g, "");
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [status, setStatus] = useState(false);
//   const navigate = useNavigate();
//   const service = new ResetPasswordService();
//   const { token } = useToken();
//   const screens = useBreakpoint();

//   const [isLoading, setIsLoading] = useState(false);

//   const onFinish = (values) => {
//     setIsLoading(true);
//     service
//       .post(values, {
//         headers: {
//           token: reset_token, // Pass token under the key 'token'
//         },
//       })
//       .then((res) => {
        
//         message.success(res.data.message);
//         setStatus(true);
//         setSuccessMessage(res.data.message);
//       })
//       .catch((err) => {
//         setStatus(false);
//        message.error(err.response.data.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const styles = {
//     container: {
//       backgroundColor: "rgba(240, 240, 240, 0.2)", // Transparent white with some opacity.
//       borderRadius: "10px",
//       backdropFilter: "blur(28px)", // Optional for visual effect.
//       padding: screens.md
//         ? `${token.paddingXL}px`
//         : `${token.sizeXXL}px ${token.padding}px`,
//       width: "auto", // Remove the fixed width for better flexibility.
//       alignSelf: "flex-start", // Align the `div` itself to the right if needed.
//       width: "350px",
//     },
//     footer: {
//       marginTop: token.marginLG,
//       textAlign: "center",
//       width: "100%",
//     },
//     forgotPassword: {
//       paddingTop: "10px",
//       float: "right",
//       color: "#4c5270",
//     },
//     header: {
//       marginBottom: token.marginXL,
//     },
//     section: {
//       backgroundColor: token.colorBgContainer,
//       display: "flex",
//       flexDirection: "column", // For vertical stacking; change to "row" if you want a horizontal layout.
//       justifyContent: "center", // Vertically centers items.
//       alignItems: "flex-end", // Aligns items horizontally to the right.
//       minHeight: "100vh", // Ensures full viewport height.
//       backgroundPosition: "center",
//       backgroundSize: "cover",
//       paddingLeft:"5%",
//       width: "100%", // Ensures the section spans the full width.
//     },
//     text: {
//       color: "white",
//     },
//     title: {
//       fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
//     },
//   };

//   return (
//     <section
//       style={{
//         ...styles.section,
//         backgroundImage: `url(${process.env.PUBLIC_URL}/loginpageimage.jpg)`,
//       }}
//     >
//       <div
//         style={{
//           ...styles.container,
//         }}
//       >
//         <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
//           <img
//             src={`${process.env.PUBLIC_URL}/edge-logo1.png`}
//             alt="Logo"
//             style={{ width: "75%", height: "auto", borderRadius: "10px" }}
//           />
//         </div>
//         {status ? (
//           <>
//             <h1
//               style={{
//                 textAlign: "center",
//                 color: "#4c5270",
//                 paddingBottom: "2rem",
//               }}
//             >
//               {successMessage}
//             </h1>
//             <Button
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   padding: "5px",
//                   float: "right",
//                   marginTop: "10px",
//                 }}
//                 disabled={isLoading}
//               >
//                 <Link
//                   to="/login"
//                   style={{
//                     float: "left",
//                     color: "#4c5270",
//                   }}
//                 >
//                   Login
//                   <ArrowRightOutlined
//                     style={{ paddingLeft: "3px", marginTop: "7px" }}
//                   />
//                 </Link>
//               </Button>
//           </>
//         ) : (
//           <Form
//             name="normal_login"
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             layout="vertical"
//             requiredMark="optional"
//           >
//             <Form.Item
//               name="newPassword"
//               label={
//                 <div style={{ color: "white", fontWeight: "700" }}>
//                   NEW PASSWORD
//                 </div>
//               }
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your new password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 type="password"
//                 placeholder="Enter"
//                 style={{ padding: "8px 12px" }}
//               />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label={
//                 <div style={{ color: "white", fontWeight: "700" }}>
//                   CONFIRM PASSWORD
//                 </div>
//               }
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your confirm password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 type="password"
//                 placeholder="Enter"
//                 style={{ padding: "8px 12px" }}
//               />
//             </Form.Item>

//             <Form.Item style={{ marginBottom: "0px" }}>
//               <Button
//                 block="true"
//                 type="primary"
//                 htmlType="submit"
//                 style={{
//                   padding: "20px 12px",
//                   backgroundColor: isLoading ? "#1677ff" : undefined,
//                   borderColor: isLoading ? "#1677ff" : undefined,
//                   cursor: isLoading ? "not-allowed" : undefined,
//                 }}
//                 disabled={isLoading}
//                 icon={
//                   <Spin
//                     spinning={isLoading}
//                     indicator={<SyncOutlined spin />}
//                     // size="small"
//                     style={{ color: "white" }}
//                   />
//                 }
//               >
//                 {!isLoading ? "Reset" : ""}
//               </Button>
//             </Form.Item>
//           </Form>
//         )}
//       </div>
//     </section>
//   );
// }

export default function ResetPassword() {
  return <>ResetPassword</>
}