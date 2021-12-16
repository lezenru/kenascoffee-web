import styled from "styled-components";

const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props => props.theme.accent)};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width:100%;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

//{...props} 를 안하면 입력가능해져서 이상해짐

/*
function Button (props) {
    return <SButton {...props} />
}
*/

export default Button;