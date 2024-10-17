import { Space, Image, Flex, Typography, ConfigProvider, Button, Carousel } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Background from "../Assets/Background_test.jpg";
import { ArrowDownOutlined } from '@ant-design/icons';
import '../Style/Root.css';
const { Title, Paragraph} = Typography;


export default function Root() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <>
      <div>
        <Flex id="BackgroundImgCont" justify="center" align="center">
          <Image id="BackgroundImg" src= {Background} preview={false}/>
          <div id="BackgroundImgFilter"/>
        </Flex>
        <Space id="TitContainer" direction="vertical">
          <ConfigProvider theme={{token:{colorText:"#ffffff",},}}>
            <Typography>
              <Title style={{fontSize: "7vw"}}>Bienvenue</Title>
              <Paragraph style={{fontSize: "2vw"}}>Sur l'intranet du groupe SGDF Salvador Serena</Paragraph>
            </Typography>
          </ConfigProvider>
          <Space direction='horizontal'>
            <Link to='/login' className="LinkTit">Se connecter</Link>
            <Link to='/register' className="LinkTit" >Créer un compte</Link>
          </Space>
        </Space>
      </div>
      <Flex justify="center">
        <a href="#carousel">
          <Button ghost size="large" icon={<ArrowDownOutlined/>} style={{position:"absolute", bottom:"50px"}}/>
        </a>
      </Flex>
      <Carousel afterChange={onChange} arrows autoplay autoplaySpeed={5000} id="carousel">
        <div>
          <Flex justify="center" style={{position:"absolute", bottom:"50px", left:"50px",}}>
            <a href="#next">
              <Button ghost size="large" icon={<ArrowDownOutlined/>}/>
            </a>
          </Flex>
          <h3 className="contentStyle" style={{backgroundColor:"#003A5D"}}>Le groupe</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#622599"}}>Les violets</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#61BD98"}}>Les farfadets</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#EE7F00"}}>Les louveteaux-Jeannettes</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#0069B2"}}>Les Scouts et Guides</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#C22E16"}}>Les Pionniers/Caravelles</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#006D3E"}}>Les Compagnons</h3>
        </div>
        <div>
          <h3 className="contentStyle" style={{backgroundColor:"#6D73A7"}}>Les Audacieux</h3>
        </div>
      </Carousel>
      <section id="next" style={{height:"100vh"}}></section>
    </>
  );
}
