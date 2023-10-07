// 정규 표현식

/**이메일 정규표현식
 *
 * 1 .숫자 or 영문 (소문자, 대문자)시작\
 * 2. '@' 포함되어야 하고\
 * 3. ' . ' 뒤에는 영문 2~3자리로 입력 후 끝
 */
const EXP_EMAIL =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export { EXP_EMAIL };