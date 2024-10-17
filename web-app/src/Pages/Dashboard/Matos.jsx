import React, { useState } from "react";
import { Card, Divider, Flex } from "antd";
import "../../Style/Matos.css";

export default function Matos() {
  const tabListLJ = [
    {
      key: "LJ3",
      tab: "LJ3",
    },
    {
      key: "LJ7",
      tab: "LJ7",
    },
  ];
  const contentListLJ = {
    LJ3: <p>content1</p>,
    LJ7: <p>content2</p>,
  };
  const tabListSG = [
    {
      key: "SG3",
      label: "SG3",
    },
    {
      key: "SG7",
      label: "SG7",
    },
  ];
  const contentListSG = {
    SG3: <p>article content</p>,
    SG7: <p>app content</p>,
  };
  const tabListCompa = [
    {
      key: "incomparables",
      tab: "Incomparables",
    },
  ];
  const contentListCompa = {
    incomparables: <p>content1</p>,
  };
  const [activeTabKey1, setActiveTabKey1] = useState("LJ3");
  const [activeTabKey2, setActiveTabKey2] = useState("SG3");
  const [activeTabKey3, setActiveTabKey3] = useState("incomparables");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const onTab3Change = (key) => {
    setActiveTabKey3(key);
  };
  return (
    <>
      <Divider>Gros matériel commun</Divider>
      <Flex horizontal wrap justify='start'>
        <Card className='card tentes' title='Tentes' bordered={true}>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
          <Card.Grid className='card_grid' style={{ width: "25%" }}>
            Content
          </Card.Grid>
        </Card>
        <Card className='card tripattes' title='Tripattes' bordered={true}>
          <Card.Grid className='card_grid'>Content</Card.Grid>
          <Card.Grid className='card_grid'>Content</Card.Grid>
          <Card.Grid className='card_grid'>Content</Card.Grid>
          <Card.Grid className='card_grid'>Content</Card.Grid>
          <Card.Grid className='card_grid'>Content</Card.Grid>
          <Card.Grid className='card_grid'>Content</Card.Grid>
          <Card.Grid className='card_grid'>Content</Card.Grid>
        </Card>
      </Flex>
      <Divider>Matériel spécifique aux unités</Divider>
      <Flex horizontal wrap justify='start'>
        <Card className='card farfadets' title='Farfadets'></Card>
        <Card
          className='card louveteaux'
          title='Louveteaux-Jeannettes'
          tabList={tabListLJ}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          {contentListLJ[activeTabKey1]}
        </Card>
        <Card
          className='card scouts'
          title='Scouts et Guides'
          tabList={tabListSG}
          activeTabKey={activeTabKey2}
          onTabChange={onTab2Change}
        >
          {contentListSG[activeTabKey2]}
        </Card>
        <Card className='card pio' title='Pionniers-Caravelles'></Card>
        <Card
          className='card louveteaux'
          title='Compagnons'
          tabList={tabListCompa}
          activeTabKey={activeTabKey3}
          onTabChange={onTab3Change}
        >
          {contentListCompa[activeTabKey3]}
        </Card>
        <Card className='card farfadets' title='Commun'></Card>
      </Flex>
    </>
  );
}
