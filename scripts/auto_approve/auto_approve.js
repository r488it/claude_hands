// == Auto‑Approve *ALL* MCP + Auto‑Continue =========================
// 2025‑04‑18 版　@author: r488it
// ------------------------------------------------------------------
// 1. DevTools を開けるようにする（設定 OR Ctrl/Cmd+Opt/Alt+Shift+I）
// 2. このコードを Snippet に貼って Run
// ------------------------------------------------------------------

const APPROVE_COOLDOWN_MS   = 1500;   // 誤連打防止 (ms)

let lastApprove   = 0;

/* === 承認ボタンを探しクリック =================================== */
function autoApprove() {
  const now = Date.now();
  if (now - lastApprove < APPROVE_COOLDOWN_MS) return;

  const dialog = document.querySelector('[role="dialog"]');
  if (!dialog) return;

  const btn = [...dialog.querySelectorAll('button')]
               .find(b => /Allow|許可/.test(b.textContent));
  if (!btn) return;

  btn.click();
  lastApprove = now;
  console.log("✅ Auto‑approved MCP:", dialog.textContent.trim().slice(0, 80));
}

/* === MutationObserver で常時監視 ================================ */
const observer = new MutationObserver(() => {
  autoApprove();
});

observer.observe(document.body, { childList: true, subtree: true });
console.log("🎉 Auto‑approve ALL MCP + auto‑continue script loaded");
