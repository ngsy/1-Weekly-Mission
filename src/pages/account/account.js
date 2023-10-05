import * as nodeUtils from "../../utils/nodeUtils.js";
// 정규 표현식
const expEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

/***
 *유효성 검사 함수
 *
 *
 *1.Null check
 *2.타입에 맞게 양식을 제대로 작성했는지 정규표현식 검사
 *3.조건에 맞지 않을 시 에러 메시지 생성
 *
 */
function validateInput(e) {
  let node = e.target;
  let nodeInfo = {
    type: node.type,
    className: node.className,
    value: node.value,
  };
  let errorGb = false; //Error 구분값
  let errType = 0;

  /** 기존 에러 이벤트 초기화 */
  if (node.classList.contains("errorInput")) {
    node.classList.remove("errorInput");
  }
  if (
    node.nextElementSibling !== null &&
    node.nextElementSibling.className === "error_msg"
  ) {
    node.nextElementSibling.remove("error_msg");
  }

  if (nodeInfo.value === "") {
    errorGb = true;
    errType = 1;
  } else {
    //정규표현식 체크
    if (nodeInfo.type === "email") {
      errorGb = !expEmail.test(nodeInfo.value);
      errType = 2;
    }
  }

  //Error 이벤트 동작
  if (errorGb) {
    let errMsg = setErrorMsg(nodeInfo, errType); //error 메세지 생성
    let errTag = nodeUtils.createNode("span", "error_msg", errMsg); //tag 생성
    node.classList.add("errorInput"); //error class 추가 및 삭제
    node.after(errTag);
  }
}

/***
 * 에러 메세지 생성 함수
 * errType
 *    1 : value 없음
 *    2 : 유효성 검사 실패
 *
 *
 *
 */
function setErrorMsg(nodeInfo, errType) {
  let type = nodeInfo.type;
  let className = nodeInfo.className;
  let errorMsg = { type: "", errType: errType };
  let result = "";
  if (type === "email") {
    errorMsg.type = "이메일";
  } else if (
    type === "password" ||
    className === "pwd_input" ||
    className === "pwd_check"
  ) {
    errorMsg.type = "비밀번호";
  }

  if (errType === 1) {
    result = `${errorMsg.type}을 입력해주세요.`;
  } else if (errType === 2) {
    result = `올바른 ${errorMsg.type} 주소가 아닙니다.`;
  }

  return result;
}
/***
 * password togglePasswordVisibility
 *
 * 패스워드 타입 변경 이벤트 함수
 *
 *
 *
 *
 */
function togglePasswordVisibility(e) {
  let target = e.target;
  let prevSibling = target.previousElementSibling; //이전 형제 요소
  console.log(prevSibling);
  if (prevSibling.getAttribute("type") === "password") {
    prevSibling.setAttribute("type", "text");
    target.setAttribute("src", "/src/assets/img/open_eyes.png");
  } else {
    prevSibling.setAttribute("type", "password");
    target.setAttribute("src", "/src/assets/img/close_eyes.png");
  }
}

export { validateInput, togglePasswordVisibility };