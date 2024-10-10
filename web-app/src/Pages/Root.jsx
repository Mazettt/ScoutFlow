import { Space, Image, Flex, Typography, ConfigProvider, Button, Carousel } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Background from "../Assets/Background_test.jpg";
import { ArrowDownOutlined } from '@ant-design/icons';
const { Title, Paragraph} = Typography;


export default function Root() {
  const contentStyle = {
    margin: 0,
    height: '100vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background:'blue'
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const LinkStyle = {
    fontSize:"1.5vw", 
    color:"white",
    margin:"1vw", 
    border:"solid #dfdfdf", 
    borderRadius:"15px", 
    padding:"15px",
  };
  return (
    <>
      <div >
        <Flex justify="center" align="center" style={{width: "100vw", height:"100vh", overflow: "hidden",  zIndex: -1}}>
          <Image style={{ minHeight:"100vh", width: "auto", display:"inline"}} src= {Background} preview={false}/>
          <div style={{width: "100vw", height:"100vh", background:"#000000b3", position:"absolute", top:0}}/>
        </Flex>
        <Space  direction="vertical" style={{position: "absolute", top:0, left: 0, marginLeft:"5vw"}}>
          <ConfigProvider
            theme={{
              token:{
                colorText:"#ffffff",
              },
            }}>
            <Typography >
              <Title style={{fontSize: "7vw"}}>Bienvenue</Title>
              <Paragraph style={{fontSize: "2vw"}}>Sur l'intranet du groupe SGDF Salvador Serena</Paragraph>
            </Typography>
          </ConfigProvider>
          <Space direction='horizontal'>
            <Link to='/login' style={LinkStyle}>Se connecter</Link>
            <Link to='/register' style={LinkStyle}>Créer un compte</Link>
          </Space>
        </Space>
      </div>
      <Flex justify="center">
        <a href="#carousel">
          <Button ghost size="large" icon={<ArrowDownOutlined/>} style={{position:"absolute", bottom:"50px"}}/>
        </a>
      </Flex>
      <Carousel afterChange={onChange} arrows id="carousel">
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
}
