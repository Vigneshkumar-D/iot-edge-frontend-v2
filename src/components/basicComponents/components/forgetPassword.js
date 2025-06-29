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

import {
  ArrowRightOutlined,
  MailOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { postForgetPassword } from "../service/authService";
import { Mail } from "lucide-react";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function ForgetPassword() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [resMessage, setResMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);

    try {
      const res = await postForgetPassword(values);

      message.success(res.data.message);
      setResMessage(res.data.message);
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Password reset failed";
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
      padding: "1rem", // Inner padding.
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
      color: "white",
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
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            Enter your Email to continue
          </div>
          <Form
            name="forget_password"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "300px" }}
          >
            {resMessage ? (
              <h3
                style={{
                  textAlign: "center",
                  paddingBottom: "2rem",
                  color: "#fff",
                }}
              >
                We've emailed a password reset link. Please check your inbox or
                spam folder.
              </h3>
            ) : (
              <>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                  style={{ marginBottom: "0px" }}
                >
                  <Input
                    prefix={<Mail size={14} />}
                    placeholder="Email"
                    style={{ padding: "8px 12px" }}
                  />
                </Form.Item>
                <Flex justify="end">
                  <Link
                    to="/login"
                    style={{
                      float: "right",
                      color: "#1677ff",
                      padding: "5px 0px 20px",
                    }}
                  >
                    Back to Login
                  </Link>
                </Flex>

                <Form.Item style={{ marginBottom: "0px", textAlign: "center" }}>
                  <Button
                    block
                    htmlType="submit"
                    className="custom-submit-button"
                    disabled={isLoading}
                    style={{ width: "7rem" }}
                    icon={
                      <Spin
                        spinning={isLoading}
                        indicator={<SyncOutlined spin />}
                        style={{ color: "white" }}
                      />
                    }
                  >
                    {!isLoading ? "Submit" : ""}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </Col>
    </Row>
  );
}
