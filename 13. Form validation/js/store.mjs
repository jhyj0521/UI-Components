let currentPage = 'signin';
let formData = [
  {
    type: 'userid',
    regExp: new RegExp(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    ),
    errorMessage: '이메일 형식에 맞게 입력해 주세요.',
    validated: false,
    value: ''
  },
  {
    type: 'password',
    regExp: new RegExp(/^[0-9a-zA-Z]{6,12}$/),
    errorMessage: '영문 또는 숫자를 6~12자 입력하세요.',
    validated: false,
    value: ''
  }
];

const getCurrentPage = () => currentPage;

const getErrorMessage = inputType =>
  formData.find(({ type }) => type === inputType).errorMessage;

const getValidated = inputType =>
  formData.find(({ type }) => type === inputType).validated;

const getValue = inputType =>
  formData.find(({ type }) => type === inputType).value;

const toggleCurrentPage = () => {
  currentPage = currentPage === 'signin' ? 'signup' : 'signin';
};

const setValidated = inputType => {
  const input = formData.find(({ type }) => type === inputType);
  input.validated = input.regExp.test(input.value);
};

const setValue = (inputType, newValue) => {
  formData.find(({ type }) => type === inputType).value = newValue;
  setValidated(inputType);
};

const isValidForm = () =>
  currentPage === 'signin'
    ? formData
        .filter(({ type }) => type === 'userid' || type === 'password')
        .every(({ validated }) => validated)
    : formData.every(({ validated }) => validated);

const resetForm = () => {
  formData = formData.map(input => ({ ...input, validated: false, value: '' }));
};

const store = {
  getCurrentPage,
  getErrorMessage,
  getValidated,
  getValue,
  toggleCurrentPage,
  setValue,
  isValidForm,
  resetForm
};

export default store;
