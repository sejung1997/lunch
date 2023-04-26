
import React from "react";

import styled from "@emotion/styled";
import {UpOutlined, DownOutlined,DeleteOutlined} from   '@ant-design/icons';



const Title = styled.div`
    display:flex;
    justify-content: space-between;
    width: 180px;
    
    :hover {
        cursor: pointer;
    }
`
const List = styled.ul`
width: 180px;
font-size: 14px;
    li {
        margin-top: 10px;
    
    

    }

`


const Conatainer = styled.div`
    position: absolute;
    right: -180px;  
    top: 0;
    z-index: 100;
    display: flex;

    flex-direction: column;
`

const ListToggle = styled.div`
`   



const RegionHistory = () => {
    const [isListShow, setIsListShow] = React.useState(false)
    const [regionList, setRegionList] = React.useState([])
    React.useEffect(() => {
        setRegionList( JSON.parse(localStorage.getItem('regionHistory') || "[]"))
    },[])
    const onClickToggle = () => {
        setIsListShow((prev) => !prev)
    }
    return (
        <Conatainer>
            <Title onClick={onClickToggle}>최근 지역 목록
    {isListShow? <UpOutlined />: <DownOutlined />}
            </Title>
            <List>  
            {isListShow &&regionList?.map((el:string) => 
                <li >{el} <DeleteOutlined /></li>
            )}
            </List>
    
        
        </Conatainer>
    )
}
export default RegionHistory