import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import Button from "../components/auth/Button";
import styled, {css} from "styled-components";
import Input from "../components/auth/Input";

/* /shop/:id: show the user a form to edit a shop, or a button to delete the shop. */


const SEE_COFFEE_SHOP_QUERY = gql`
    query seeCoffeeShop($id: Int!){
        seeCoffeeShop(id: $id){
            id
            name
            user{
                id
                name
            }
            latitude
            longitude
            isMine


        }
    }
`;

const MyShop = styled.div`

`;



function CoffeeShop(){

    const params = useParams();

    const {data} = useQuery(SEE_COFFEE_SHOP_QUERY, {
        variables: {
            id: parseInt(params.id),
        },
    });


    console.log(data);

/* 자꾸 데이터를 못찾는다는 오류가 뜨는건 ?. 로 존재할때만 표시되게 수정해서 해결 */
    return (
        <div>
            {data?.seeCoffeeShop?.isMine
                ? <MyShop>
                    name
                    <Input type={"text"}
                           placeholder={data?.seeCoffeeShop?.name}/>
                    latitude
                    <Input type={"text"}
                           placeholder={data?.seeCoffeeShop?.latitude}/>
                    longitude
                    <Input type={"text"}
                           placeholder={data?.seeCoffeeShop?.longitude}/>

                    <div><button>삭제하기</button></div>
                </MyShop>

                :
                <div>
                    커피샵이름 : {data?.seeCoffeeShop?.name}
                    <br/>
                    샵주인이름 : {data?.seeCoffeeShop?.user?.name}
                    <br/>
                </div>}



            <isMyShop>



            </isMyShop>

        </div>


    );
}

export default CoffeeShop;