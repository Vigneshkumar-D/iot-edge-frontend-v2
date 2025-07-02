import React, { useState } from "react";

import {
  Button,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  message,
  Row,
  Spin,
  theme,
} from "antd";

import { LockOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postLogin } from "../service/authService";
import { LockKeyhole, LogIn, Mail } from "lucide-react";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function Login() {
  const navigate = useNavigate();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const res = await postLogin(values);

      const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000); // Set for 10 minutes
      Cookies.set("login_token", res.data.message, {
        expires: expirationTime,
      });

      navigate("/", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      message.error(msg);
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
      float: "right",
      color: "#1677ff",
      padding: "5px 0px 20px",
    },
    header: {
      marginBottom: token.marginXL,
    },

    section: {
      display: "flex",
      flexDirection: "column", // For vertical stacking; change to "row" if you want a horizontal layout.
      justifyContent: "center", // Vertically centers items.
      alignItems: "flex-end", // Aligns items horizontally to the right.
      minHeight: "100vh", // Ensures full viewport height.
      backgroundPosition: "fixed",
      backgroundSize: "cover",
      paddingLeft: "5%",
    },

    text: {
      color: "black",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  const loginToken = Cookies.get("login_token");

  return loginToken ? (
    <Navigate to="/" replace={true} />
  ) : (
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
          <div
            style={{ fontSize: "22px", fontWeight: 700, textAlign: "center" }}
          >
            Welcome Back
          </div>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            Enter your Email & Password to login
          </div>
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
              name="username"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                style={{ padding: "8px 12px" }}
                // prefix={<UserOutlined />}
                prefix={<Mail size={14} />}
                placeholder="Enter"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              style={{ marginBottom: "0px" }}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockKeyhole size={14} />}
                type="password"
                placeholder="Enter"
                style={{ padding: "8px 12px" }}
              />
            </Form.Item>
            <Flex justify="end">
              <Link to="/forget-password" style={styles.forgotPassword}>
                Forgot password?
              </Link>
            </Flex>
            <Form.Item style={{ marginBottom: "0px", textAlign: "center" }}>
              <Button
                block="true"
                // type="primary"
                htmlType="submit"
                className="custom-submit-button"
                style={{ width: "7rem" }}
                disabled={isLoading}
                icon={
                  <Spin
                    spinning={isLoading}
                    indicator={<SyncOutlined spin />}
                    // size="small"
                    style={{ color: "white" }}
                  />
                }
              >
                {!isLoading ? "Log in" : ""} <LogIn size={14} />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
