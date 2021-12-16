import {logUserOut} from "../apollo";
import routes from "../routes";
import BottomBox from "../components/auth/BottomBox";
import {gql, useQuery} from "@apollo/client";
import {Link, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {BaseBox} from "../components/shared";







const SEE_COFFEE_SHOPS_QUERY =gql`
 query seeCoffeeShops($page: Int){
     seeCoffeeShops(page: $page){
         shops{
             id
             name
             user{
                 name
             }
         }
         ok
         totalPages
         error
     }
 }
`;

const HomeContainer = styled.div`
  width: 600px;
  height: 1000px;
  
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`


const ShopContainer = styled.div`

`;


function Home() {

    const {data} = useQuery(SEE_COFFEE_SHOPS_QUERY);



    return (

        <HomeContainer>
                <div>
                    {data?.seeCoffeeShops?.shops?.map(shop =>
                        <BaseBox>
                            <Link to={`/shop/${shop.id}`}>
                                샵번호:{shop.id} <br/>
                                샵이름:{shop.name} <br/>
                                샵주인이름:{shop.user.name}<br/>
                            </Link>
                        </BaseBox>)}
                </div>



                <button onClick={() => logUserOut()}>Logout in now!</button>

                <br/>
                <BottomBox cta="My Coffee Shop" link={routes.addShop} linkText="Edit Your Shop"/>
                <br/>
                <BottomBox cta="Don't have a shop?" link={routes.addShop} linkText="Add Your Shop"/>




        </HomeContainer>

    )

}

export default Home;