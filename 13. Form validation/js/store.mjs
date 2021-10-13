let state = {
  userid: {
    regExp: new RegExp(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    ),
    errorMessage: '이메일 형식에 맞게 입력해 주세요.',
    validated: false,
    value: ''
  },
  password: {
    regExp: new RegExp(/^[0-9a-zA-Z]{6,12}$/),
    errorMessage: '영문 또는 숫자를 6~12자 입력하세요.',
    validated: false,
    value: ''
  }
};

const getErrorMessage = inputType => state[inputType].errorMessage;
const getValidated = inputType => state[inputType].validated;
const getValue = inputType => state[inputType].value;

const setValidated = inputType => {
  const _inputType = state[inputType];
  _inputType.validated = _inputType.regExp.test(_inputType.value);
};

const setValue = (inputType, newValue) => {
  state[inputType].value = newValue;
  setValidated(inputType);
};

const reset = () => {
  state = {
    userid: {
      regExp: new RegExp(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      ),
      errorMessage: '이메일 형식에 맞게 입력해 주세요.',
      validated: false,
      value: ''
    },
    password: {
      regExp: new RegExp(/^[0-9a-zA-Z]{6,12}$/),
      errorMessage: '영문 또는 숫자를 6~12자 입력하세요.',
      validated: false,
      value: ''
    }
  };
};

const store = { getErrorMessage, getValidated, getValue, setValue, reset };

export default store;
