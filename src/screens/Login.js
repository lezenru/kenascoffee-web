import {isLoggedInVar, logUserIn} from "../apollo";
import styled from "styled-components";
import {gql, useMutation} from "@apollo/client";
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import PageTitle from "../components/auth/PageTitle";
import FormBox from "../components/auth/FormBox";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import routes from "../routes";
import BottomBox from "../components/auth/BottomBox";
import FormError from "../components/auth/FormError";
import Separator from "../components/auth/Separator";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;


const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
            }
        }
`;



function Login() {

    const location = useLocation();

    const {
        register, handleSubmit, formState, getValues, setError, clearErrors
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username : location?.state?.username || "",
            password : location?.state?.password || "",
        }
    })

    const onCompleted = (data) => {
        const { login: {ok, token, error}} = data;

        if (!ok) {
            setError("result", {message: error});
        };

        if (token) {
            logUserIn(token)
        }
    }

    const [login, {loading}] = useMutation(LOGIN_MUTATION, {onCompleted});

    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        const {username, password} = getValues();
        login({
            variables: { username, password }
        });

    };

    const clearLoginError = () => {
        clearErrors("result")
    }

    return (
        <AuthLayout>
            <PageTitle title="Login"/>
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <Notification>{location?.state?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("username",
                            {
                                required: "Username is Required",
                                minLength: {
                                    value: 2,
                                    message: "2글자 이상 사용해주세요",
                                },
                                //validate: (currentValue) => currentValue.includes("Potato"),
                            })}
                        onFocus={clearLoginError}
                        name={"username"}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}/>
                    <FormError message={formState.errors?.username?.message} />
                    <Input
                        {...register("password",
                            {
                                required:"Password is Required"
                            })}
                        name="password"
                        type="password"
                        onFocus={clearLoginError}
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}/>
                    <FormError message={formState.errors?.password?.message} />
                    <Button type="submit"
                            value={loading ? "Loading..." : "Log in"}
                            disabled={!formState.isValid || loading} />
                    <FormError message={formState.errors?.result?.message} />
                </form>
                <Separator/>
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign up"/>


        </AuthLayout>
    )
};

export default Login;