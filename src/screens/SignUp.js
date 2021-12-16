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

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount (
        $name: String!,
        $username: String!,
        $email: String!,
        $password: String!,
        $location: String,
        $avatarURL: String,
        $githubUsername: String,
    ) { 
        createAccount (
            name: $name,
            username: $username,
            email: $email,
            password: $password,
            
            location: $location,
            avatarURL: $avatarURL,
            githubUsername: $githubUsername,
        ){
            ok
            error
        }
    }
`;



function SignUp() {

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
        const {username, password} = getValues();
        const {
            createAccount: { ok, error},
        } = data;
        if (!ok) {
            setError("result", {
                message: error,
            });
        }
        navigate(routes.home, {
            state: {
                message:"계정이 생성되었습니다. 로그인해주세요",
                username: username,
                password: password,
            }
        });

    };

    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });


    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }

        const { name, username, email, password, location, avatarURL, githubUsername } = getValues();
        createAccount({
            variables: { ...data },
        });
    };

    return (
        <AuthLayout>
            <PageTitle title="SignUp"/>
            <FormBox>

                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                </HeaderContainer>

                <form onSubmit={handleSubmit(onSubmitValid)}>

                    <Input
                        {...register("username",
                            {
                                required: "Username is Required",
                            })}
                        name="username"
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}/>

                    <Input
                        {...register("password",
                            {
                                required: "Password is Required",
                            })}
                        name="password"
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}/>

                    <Input
                        {...register("email",
                            {
                                required: "Email is Required",
                            })}
                        name="email"
                        type="text"
                        placeholder="Email"
                        hasError={Boolean(formState.errors?.email?.message)}/>

                    <Input
                        {...register("name",
                            {
                                required: "Name is Required",
                            })}
                        name="name"
                        type="text"
                        placeholder="Name"
                        hasError={Boolean(formState.errors?.name?.message)} />

                    <Separator/>

                    <Input
                        {...register("location",
                            {
                                required: false,
                            })}
                        name="location"
                        type="text"
                        placeholder="Location" />
                    <Input
                        {...register("avatarURL",
                            {
                                required: false,
                            })}
                        name="avatarURL"
                        type="text"
                        placeholder="AvatarURL" />
                    <Input
                        {...register("githubUsername",
                            {
                                required: false,
                            })}
                        name="githubUsername"
                        type="text"
                        placeholder="Github Username" />

                    <FormError message={formState.errors?.result?.message} />

                    <Button
                        type="submit"
                        value={loading ? "Loading..." : "Sign Up"}
                        disabled={!formState.isValid || loading} />
                </form>

            </FormBox>
            <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />


        </AuthLayout>
    );
}

export default SignUp;