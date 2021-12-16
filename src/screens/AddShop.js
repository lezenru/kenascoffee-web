import styled, {css} from "styled-components";
import {
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import {BaseBox, FatLink} from "../components/shared";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/auth/PageTitle";
import {useForm} from "react-hook-form";
import {gql, useMutation} from "@apollo/client";

import {useNavigate} from "react-router-dom";
import FormError from "../components/auth/FormError";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_COFFEE_SHOP_MUTATION = gql`
    mutation createCoffeeShop (
        $name: String!,
        $latitude: String,
        $longitude: String,
        $categories: String,
    ) {
        createCoffeeShop (
            name: $name,
            latitude: $latitude,
            longitude: $longitude,
            categories: $categories,
        ){
            ok
            error
        }
    }
`;



function AddShop() {

    const navigate = useNavigate();
    const {register,
        handleSubmit,
        formState,
        getValues,
        setError,
        clearErrors}
        = useForm({
        mode: "onChange"
    });

    const onCompleted = (data) => {

        console.log(data);


        const {
            createCoffeeShop: { ok, error, shop},
        } = data;
        console.log(createCoffeeShop)

        if (!ok) {
            setError("result", {
                message: error,
            });
        }

        navigate(routes.home);

    };

    const [createCoffeeShop, { loading }]
        = useMutation(CREATE_COFFEE_SHOP_MUTATION, {
        onCompleted,
    });

    const onSubmitValid = (data) => {

        if (loading) {
            return;
        }

        console.log(data);

        const { name, latitude, longitude, categories } = getValues();
        createCoffeeShop({
            variables: { ...data  },
        });

    };



    return(
        <AuthLayout>
            <PageTitle title={"Add Coffee Shop"}/>
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>
                        Add Your Coffee Shop.
                    </Subtitle>
                </HeaderContainer>

                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("name",
                            {
                                required: "CoffeeShop Name is Required",
                            })}
                        name="name"
                        type="text"
                        placeholder="CoffeeShop Name"
                        hasError={Boolean(formState.errors?.name?.message)}/>
                    <Input
                        {...register("latitude",
                            {
                                required: false,
                            })}
                        name="latitude"
                        type="text"
                        placeholder="Latitude"/>
                    <Input
                        {...register("longitude",
                            {
                                required: false,
                            })}
                        name="longitude"
                        type="text"
                        placeholder="Longitude"/>
                    <Input
                        {...register("categories",
                            {
                                required: false,
                            })}
                        name="categories"
                        type="text"
                        placeholder="#으로 카테고리를 적어주세요"/>

                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Add Shop"}
                        disabled={!formState.isValid || loading} />

                    <FormError message={formState.errors?.result?.message} />

                </form>

            </FormBox>

        </AuthLayout>
    );

}


export default AddShop;