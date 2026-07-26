const domainSelect = document.querySelector("#emailDomain");
const domainCustom = document.querySelector("#emailDomainCustom");

function syncEmailDomain() {
  const useCustom = domainSelect.value === "";
  domainCustom.hidden = !useCustom;
  domainCustom.required = useCustom;
  domainCustom.disabled = !useCustom;
  domainSelect.required = !useCustom;
}

if (domainSelect) {
  domainSelect.addEventListener("change", syncEmailDomain);
  syncEmailDomain();
}

function markField(input, message) {
  const field = input.closest(".field");
  const messageEl = field?.querySelector(".field-message");
  if (!input.value) {
    field?.classList.remove("is-valid", "is-invalid");
    if (messageEl) messageEl.textContent = "";
    return;
  }
  const valid = input.checkValidity();
  field?.classList.toggle("is-valid", valid);
  field?.classList.toggle("is-invalid", !valid);
  if (messageEl) messageEl.textContent = valid ? "" : message;
}

const userIdInput = document.querySelector("#userId");
userIdInput?.addEventListener("input", () =>
  markField(userIdInput, "완성된 글자로 입력해 주세요."),
);

const birthdateInput = document.querySelector("#birthdate");
if (birthdateInput) {
  const todayStr = new Date().toLocaleDateString("sv-SE");
  birthdateInput.max = todayStr;
  birthdateInput.addEventListener("input", () =>
    markField(birthdateInput, `1900-01-01부터 ${todayStr} 사이로 입력해 주세요.`),
  );
}

const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#passwordConfirm");

function syncPasswordConfirm() {
  if (
    passwordConfirmInput.value &&
    passwordConfirmInput.value !== passwordInput.value
  ) {
    passwordConfirmInput.setCustomValidity("비밀번호가 일치하지 않습니다.");
  } else {
    passwordConfirmInput.setCustomValidity("");
  }
  markField(passwordConfirmInput, "비밀번호가 일치하지 않습니다.");
}

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    markField(passwordInput, "영문+숫자를 조합해서 8자 이상 입력해 주세요.");
    if (passwordConfirmInput?.value) syncPasswordConfirm();
  });
}
passwordConfirmInput?.addEventListener("input", syncPasswordConfirm);
