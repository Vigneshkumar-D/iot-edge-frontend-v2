// import React, { useState } from "react";

// import {
//   Button,
//   Col,
//   Form,
//   Grid,
//   Input,
//   message,
//   Row,
//   Spin,
//   theme,
// } from "antd";

// import {
//   ArrowRightOutlined,
//   LockOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { postResetPassword } from "../service/authService";

// const { useToken } = theme;
// const { useBreakpoint } = Grid;

// export default function ResetPassword() {
//   const [searchParams] = useSearchParams();

//   // Get the value of the 'token' query parameter
//   const reset_token = searchParams.get("token")?.replace(/'/g, "");
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [status, setStatus] = useState(false);
//   const { token } = useToken();
//   const screens = useBreakpoint();

//   const [isLoading, setIsLoading] = useState(false);

//   const onFinish = async (values) => {
//     setIsLoading(true);
//     try {
//       const res = await postResetPassword(values, {
//         headers: {
//           token: reset_token, // Pass token under the key 'token'
//         },
//       });

//       message.success(res.data.message);
//       setStatus(true);
//       setSuccessMessage(res.data.message);
//     } catch (err) {
//       setStatus(false);
//       message.error(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
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
//       paddingLeft: "5%",
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
//     <Row style={{ minHeight: "100vh" }}>
//       <Col span={8}>
//         <div
//           style={{
//             backgroundPosition: "fixed",
//             backgroundSize: "cover",
//             minHeight: "100vh",
//             width: "100%",
//             backgroundPositionX: "center",
//             backgroundImage: `url(${process.env.PUBLIC_URL}/loginpageimage.jpg)`,
//           }}
//         />
//       </Col>
//       <Col
//         span={16}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               paddingBottom: "2rem",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               src={`${process.env.PUBLIC_URL}/companylogo.png`}
//               alt="Logo"
//               style={{ width: "30%", height: "auto", borderRadius: "10px" }}
//             />
//           </div>
//           {status ? (
//             <>
//               <h1
//                 style={{
//                   textAlign: "center",
//                   color: "#4c5270",
//                   paddingBottom: "2rem",
//                 }}
//               >
//                 {successMessage}
//               </h1>
//               <Button
//                 disabled={isLoading}
//                 className="custom-submit-button"
//                 style={{ width: "7rem" }}
//               >
//                 <Link to="/login">
//                   Login
//                   <ArrowRightOutlined style={{ paddingLeft: "3px" }} />
//                 </Link>
//               </Button>
//             </>
//           ) : (
//             <Form
//               name="normal_login"
//               initialValues={{
//                 remember: true,
//               }}
//               onFinish={onFinish}
//               layout="vertical"
//               style={{ width: "300px" }}
//             >
//               <Form.Item
//                 name="newPassword"
//                 label={"New Password"}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your new password!",
//                   },
//                 ]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined />}
//                   type="password"
//                   placeholder="Enter"
//                   style={{ padding: "8px 12px" }}
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 label={"Confirm Password"}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your confirm password!",
//                   },
//                 ]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined />}
//                   type="password"
//                   placeholder="Enter"
//                   style={{ padding: "8px 12px" }}
//                 />
//               </Form.Item>

//               <Form.Item style={{ marginBottom: "0px", textAlign: "center" }}>
//                 <Button
//                   block="true"
//                   htmlType="submit"
//                   className="custom-submit-button"
//                   disabled={isLoading}
//                   style={{ width: "7rem" }}
//                   icon={
//                     <Spin
//                       spinning={isLoading}
//                       indicator={<SyncOutlined spin />}
//                       // size="small"
//                       style={{ color: "white" }}
//                     />
//                   }
//                 >
//                   {!isLoading ? "Reset" : ""}
//                 </Button>
//               </Form.Item>
//             </Form>
//           )}
//         </div>
//       </Col>
//     </Row>
//   );
// }

import React, { useState } from "react";

import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  message,
  Row,
  Spin,
  theme,
} from "antd";

import {
  ArrowRightOutlined,
  LockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { postResetPassword } from "../service/authService";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  // Get the value of the 'token' query parameter
  const reset_token = searchParams.get("token")?.replace(/'/g, "");
  const [successMessage, setSuccessMessage] = useState(null);
  const [status, setStatus] = useState(false);
  const { token } = useToken();
  const screens = useBreakpoint();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const res = await postResetPassword(values, {
        headers: {
          token: reset_token, // Pass token under the key 'token'
        },
      });

      message.success(res.data.message);
      setStatus(true);
      setSuccessMessage(res.data.message);
    } catch (err) {
      setStatus(false);
      message.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      backgroundColor: "rgba(240, 240, 240, 0.2)", // Transparent white with some opacity.
      borderRadius: "10px",
      backdropFilter: "blur(28px)", // Optional for visual effect.
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "auto", // Remove the fixed width for better flexibility.
      alignSelf: "flex-start", // Align the `div` itself to the right if needed.
      width: "350px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      paddingTop: "10px",
      float: "right",
      color: "#4c5270",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      display: "flex",
      flexDirection: "column", // For vertical stacking; change to "row" if you want a horizontal layout.
      justifyContent: "center", // Vertically centers items.
      alignItems: "flex-end", // Aligns items horizontally to the right.
      minHeight: "100vh", // Ensures full viewport height.
      backgroundPosition: "center",
      backgroundSize: "cover",
      paddingLeft: "5%",
      width: "100%", // Ensures the section spans the full width.
    },
    text: {
      color: "white",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col span={8}>
        <div
          style={{
            backgroundPosition: "fixed",
            backgroundSize: "cover",
            minHeight: "100vh",
            width: "100%",
            backgroundPositionX: "center",
            backgroundImage: `url(${process.env.PUBLIC_URL}/loginpageimage.jpg)`,
          }}
        />
      </Col>
      <Col
        span={16}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              paddingBottom: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/companylogo.png`}
              alt="Logo"
              style={{ width: "30%", height: "auto", borderRadius: "10px" }}
            />
          </div>
          {status ? (
            <>
              <h1
                style={{
                  textAlign: "center",
                  color: "#4c5270",
                  paddingBottom: "2rem",
                }}
              >
                {successMessage}
              </h1>
              <Button
                disabled={isLoading}
                className="custom-submit-button"
                style={{ width: "7rem" }}
              >
                <Link to="/login">
                  Login
                  <ArrowRightOutlined style={{ paddingLeft: "3px" }} />
                </Link>
              </Button>
            </>
          ) : (
            <Form
              name="normal_login"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              layout="vertical"
              style={{ width: "300px" }}
            >
              <Form.Item
                name="newPassword"
                label={"New Password"}
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Enter"
                  style={{ padding: "8px 12px" }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Confirm Password"
                dependencies={["newPassword"]} // 👈 this tells Form to revalidate when newPassword changes
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Enter"
                  style={{ padding: "8px 12px" }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: "0px", textAlign: "center" }}>
                <Button
                  block="true"
                  htmlType="submit"
                  className="custom-submit-button"
                  disabled={isLoading}
                  style={{ width: "7rem" }}
                  icon={
                    <Spin
                      spinning={isLoading}
                      indicator={<SyncOutlined spin />}
                      // size="small"
                      style={{ color: "white" }}
                    />
                  }
                >
                  {!isLoading ? "Reset" : ""}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Col>
    </Row>
  );
}
