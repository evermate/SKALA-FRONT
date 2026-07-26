const modal = document.querySelector("#app-modal");
const messageEl = document.querySelector("#app-modal-message");
const inputEl = document.querySelector("#app-modal-input");
const cancelBtn = document.querySelector("#app-modal-cancel");
const confirmBtn = document.querySelector("#app-modal-confirm");
const metaEl = document.querySelector("#app-modal-meta");
const secretEl = document.querySelector("#app-modal-secret");
const inputHintEl = document.querySelector("#app-modal-input-hint");

export function setSecretHandler(handler) {
  secretEl.onclick = handler || null;
}

let resolveCurrent = null;
let currentWithInput = false;
let currentValidate = null;
let currentErrorHint = "";
let weClosedIt = false;

function finish(value) {
  if (!resolveCurrent) return;
  const resolve = resolveCurrent;
  resolveCurrent = null;
  resolve(value);
}

function shakeInput(tone) {
  inputEl.classList.remove("shake-error", "shake-up", "shake-down");
  void inputEl.offsetWidth;
  inputEl.classList.add(`shake-${tone}`);
  setTimeout(() => inputEl.classList.remove(`shake-${tone}`), 400);
}

function confirmNow() {
  if (currentWithInput && currentValidate) {
    const result = currentValidate(inputEl.value);
    if (result === false) {
      shakeInput("error");
      inputHintEl.textContent = currentErrorHint;
      inputHintEl.hidden = !currentErrorHint;
      inputHintEl.classList.remove("hint-up", "hint-down");
      inputHintEl.classList.add("hint-error");
      return;
    }
    if (result && typeof result === "object") {
      const tone = result.tone || "error";
      shakeInput(tone);
      inputHintEl.classList.remove("hint-error", "hint-up", "hint-down");
      inputHintEl.classList.add(`hint-${tone}`);
      inputHintEl.textContent = result.hint || "";
      inputHintEl.hidden = !result.hint;
      if (result.meta !== undefined) {
        metaEl.textContent = result.meta;
        metaEl.hidden = !result.meta;
      }
      inputEl.value = "";
      inputEl.focus();
      return;
    }
  }
  const value = currentWithInput ? inputEl.value : undefined;
  weClosedIt = true;
  modal.close();
  finish(value);
}

function cancelNow() {
  weClosedIt = true;
  modal.close();
  finish(currentWithInput ? null : true);
}

confirmBtn.addEventListener("click", confirmNow);
cancelBtn.addEventListener("click", cancelNow);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    confirmNow();
  }
});
// The native "close" event isn't guaranteed to fire synchronously with our
// own modal.close() calls above, so a stale event from a previous close can
// otherwise arrive after the next modal is already showing. weClosedIt tells
// us this "close" is just that echo, not a real external dismissal (Esc).
modal.addEventListener("close", () => {
  if (weClosedIt) {
    weClosedIt = false;
    return;
  }
  finish(currentWithInput ? null : undefined);
});

function openModal(
  message,
  withInput,
  meta,
  validate,
  errorHint,
  secondaryLabel,
  tone,
) {
  return new Promise((resolve) => {
    resolveCurrent = resolve;
    currentWithInput = withInput;
    currentValidate = validate || null;
    currentErrorHint = errorHint || "";
    messageEl.textContent = message;
    messageEl.classList.remove("msg-success", "msg-fail");
    if (tone) messageEl.classList.add(`msg-${tone}`);
    inputEl.hidden = !withInput;
    inputEl.value = "";
    inputEl.classList.remove("shake-error", "shake-up", "shake-down");
    inputHintEl.hidden = !withInput;
    inputHintEl.textContent = "";
    inputHintEl.classList.remove("hint-error", "hint-up", "hint-down");
    cancelBtn.hidden = !(withInput || secondaryLabel);
    cancelBtn.textContent = secondaryLabel || "취소";
    metaEl.textContent = meta || "";
    metaEl.hidden = !meta;
    modal.showModal();
    if (withInput) inputEl.focus();
  });
}

export function showAlert(message, replayLabel, tone) {
  return openModal(message, false, null, null, null, replayLabel, tone);
}

export function showPrompt(message, meta, validate, errorHint) {
  return openModal(message, true, meta, validate, errorHint);
}
