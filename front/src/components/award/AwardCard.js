import React, {useState, useEffect, useContext} from 'react';
import {Card, Row, Col, Button} from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import Award from './Award';
import * as Api from "../../api";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// 메인 컴포넌트라고 할 수 있습니다. 
// portfolioOwnerId는 해당하는 포트폴리오의 userID를 가리킵니다. (!== 현재 접속중인 userID)
function AwardCard ({portfolioOwnerId, isEditable}) {
 
    const [addAward, setAddAward] = useState(false);
    const [awardLists, setAwardLists] = useState([]);

    // 포트폴리오의 주인 ID가 달라지면, 수상이력을 해당 유저의 것으로 새로 불러옵니다. 
    useEffect(() =>
        Api.get("awardlist", portfolioOwnerId).then((res) => setAwardLists(res.data))
    ,[portfolioOwnerId])

    return(

      <Card className="ml-3">
        <Card.Body>
          <Row>
            <Card.Title>수상이력</Card.Title>
          </Row>
          <Row>
            {awardLists.map((award) =>
              <Award key={award.id} award={award} isEditable={isEditable} setAwardLists={setAwardLists}/>
            )}
          </Row>
          {isEditable&&(
            <Row className="text-center">
            <Col>
              <Fab color="primary" aria-label="add" size="small">
                <AddIcon onClick={()=>setAddAward(true)}/>
              </Fab>
            </Col> 
          </Row>
          )}
          
           {addAward&&(
            <Row>
                <AwardAddForm setAddAward={setAddAward} setAwardLists={setAwardLists}/>
            </Row>
           )}
        </Card.Body>
      </Card>
    
    )
}

export default AwardCard;
