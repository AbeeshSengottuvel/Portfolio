import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, CheckCircle, RefreshCw, X, AlertTriangle, ShieldCheck } from "lucide-react";

interface BugState {
  id: number;
  name: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
  howToTest: string;
  automationTest: string;
  found: boolean;
}

export const QAPlayground: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bugs, setBugs] = useState<BugState[]>([
    {
      id: 1,
      name: "Bypass Negative Quantity Validation",
      severity: "CRITICAL",
      description:
        "The quantity input field accepts negative values and doesn't validate numbers <= 0 on change, allowing users to reduce their subtotal to negative amounts and checkout for a credit refund.",
      howToTest:
        "1. Enter '-5' in the quantity field.\n2. Observe the subtotal changing to -$149.95.\n3. Click 'Checkout' to complete the invalid order.",
      automationTest:
        "// Selenium Assertion\nvar quantityInput = driver.FindElement(By.Id(\"quantity-field\"));\nquantityInput.Clear();\nquantityInput.SendKeys(\"-5\");\n\nvar checkoutButton = driver.FindElement(By.Id(\"checkout-btn\"));\nAssert.IsFalse(checkoutButton.Enabled, \"Checkout button should be disabled for negative quantities\");",
      found: false,
    },
    {
      id: 2,
      name: "Exploit Promo Code Overflow",
      severity: "HIGH",
      description:
        "Promo discount logic contains an arithmetic overflow bug. Applying code 'QA999' applies a flat -$1000.00 discount without checking if it exceeds the subtotal, creating a negative grand total.",
      howToTest:
        "1. Type 'QA999' in the coupon input field.\n2. Click 'Apply'.\n3. Notice the grand total becomes negative, indicating the business would owe the customer money.",
      automationTest:
        "// RestSharp API Assertions\nvar request = new RestRequest(\"/api/checkout/apply-promo\", Method.Post);\nrequest.AddJsonBody(new { promoCode = \"QA999\", cartSubtotal = 29.99 });\nvar response = await client.ExecuteAsync(request);\n\nAssert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);\n// Expect API to return error instead of negative total",
      found: false,
    },
    {
      id: 3,
      name: "Race Condition on Order Submission",
      severity: "HIGH",
      description:
        "The checkout button does not disable upon click. During network latency, a user can click the button multiple times, generating duplicate charge transactions and parallel database records.",
      howToTest:
        "1. Click the 'Place Order' button.\n2. During the 2-second mock loading delay, double-click or triple-click the button.\n3. Watch the Order Logs show multiple duplicate submissions.",
      automationTest:
        "// Playwright / Cypress automation verification\ncy.get('#place-order-btn').click();\ncy.get('#place-order-btn').should('be.disabled');\n// Assert that double execution is blocked by disabled state",
      found: false,
    },
    {
      id: 4,
      name: "Card Content Overflow & Layout Wrap",
      severity: "MEDIUM",
      description:
        "Entering extremely long promo codes (e.g. >25 characters) overflows the item summary container, breaking the CSS grid alignment, pushing price items off-screen, and preventing checkout.",
      howToTest:
        "1. Enter 'SUPERLONGPROMOCODENOTFITCONTAINERATALL' in the promo input.\n2. Observe the promo text spilling outside of its layout container and breaking the grid.",
      automationTest:
        "// Visual Regression Test\nvar element = driver.FindElement(By.Id(\"promo-container\"));\nAssert.IsTrue(element.Size.Height < 150, \"Promo container height exceeded limits due to layout overflow\");",
      found: false,
    },
  ]);

  const [quantity, setQuantity] = useState("1");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderLogs, setOrderLogs] = useState<string[]>([]);
  const [activeBugDetail, setActiveBugDetail] = useState<BugState | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const pricePerItem = 29.99;
  const qtyNum = parseFloat(quantity) || 0;
  const subtotal = qtyNum * pricePerItem;
  const tax = Math.max(0, subtotal * 0.08);
  const total = subtotal + tax - discount;

  // Trigger Bug 1 (Negative validation)
  useEffect(() => {
    if (qtyNum < 0 && isPlaying) {
      triggerBugFound(1);
    }
  }, [quantity]);

  // Trigger Bug 4 (Promo Text Overflow)
  useEffect(() => {
    if (promoCode.length > 25 && isPlaying) {
      triggerBugFound(4);
    }
  }, [promoCode]);

  const handleApplyPromo = () => {
    if (promoCode === "QA999") {
      setDiscount(1000.0);
      setAppliedPromo("QA999");
      setPromoError("");
      if (isPlaying) triggerBugFound(2);
    } else if (promoCode.trim() === "") {
      setPromoError("Enter a coupon code");
    } else {
      setPromoError("Invalid code. Try 'QA999'");
    }
  };

  const handleCheckout = () => {
    setIsSubmitting(true);
    setOrderLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Order request dispatched...`]);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Order Placed Successfully!`]);
    }, 2000);
  };

  // Trigger Bug 3 (Double click race condition)
  const handleCheckoutClick = () => {
    if (isSubmitting) {
      setOrderLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] WARNING: Duplicate order click captured! (Race Condition Exploit)`,
      ]);
      if (isPlaying) triggerBugFound(3);
    } else {
      handleCheckout();
    }
  };

  const triggerBugFound = (bugId: number) => {
    setBugs((prev) =>
      prev.map((b) => {
        if (b.id === bugId && !b.found) {
          const updatedBug = { ...b, found: true };
          setActiveBugDetail(updatedBug);
          return updatedBug;
        }
        return b;
      })
    );
  };

  useEffect(() => {
    if (isPlaying && bugs.length > 0 && bugs.every((b) => b.found)) {
      setShowCelebration(true);
    }
  }, [bugs]);

  const resetPlayground = () => {
    setQuantity("1");
    setPromoCode("");
    setDiscount(0);
    setPromoError("");
    setAppliedPromo("");
    setIsSubmitting(false);
    setOrderLogs([]);
    setBugs((prev) => prev.map((b) => ({ ...b, found: false })));
    setShowCelebration(false);
    setActiveBugDetail(null);
  };

  const foundCount = bugs.filter((b) => b.found).length;

  return (
    <section id="qa-playground" className="py-20 md:py-32 scroll-mt-20">
      <div className="mb-12 md:mb-16 text-center lg:text-left">
        <h2 className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter">
          Interactive QA Playground
        </h2>
        <p className="text-base md:text-lg max-w-xl text-slate-500 dark:text-slate-400 mb-6">
          Test your QA instincts! Toggle Bug Hunt mode below and click, exploit, or break the mock checkout application card to discover 4 hidden software bugs.
        </p>
        <div className="w-20 md:w-32 h-1.5 md:h-2 bg-blue-600 rounded-full mx-auto lg:mx-0"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Game Status & Instructions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 md:p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl">
            <h3 className="text-xl font-bold font-display flex items-center gap-2 mb-4">
              <Bug className="text-blue-500 animate-pulse" />
              Bug Hunt Status
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
                <span>Bugs Discovered</span>
                <span>{foundCount} / 4</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(foundCount / 4) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {bugs.map((bug) => (
                <div
                  key={bug.id}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs font-bold transition-all ${
                    bug.found
                      ? "bg-green-500/10 border-green-500/20 text-green-500"
                      : "bg-slate-500/5 border-slate-500/10 text-slate-400"
                  }`}
                >
                  <CheckCircle size={14} className={bug.found ? "" : "opacity-30"} />
                  <span className="line-through-none">{bug.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (!isPlaying) resetPlayground();
                }}
                className={`py-3 rounded-xl font-black text-sm transition-all text-center flex items-center justify-center gap-2 ${
                  isPlaying
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {isPlaying ? "Exit Bug Hunt" : "Start Bug Hunt Mode"}
              </button>
              {isPlaying && (
                <button
                  onClick={resetPlayground}
                  className="py-2.5 border border-slate-500/20 hover:bg-slate-500/5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <RefreshCw size={12} /> Reset Sandbox
                </button>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-3xl border border-slate-500/10 bg-white dark:bg-white/5 text-xs text-slate-500 leading-relaxed">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-widest">
              QA Sandbox Rules
            </h4>
            <ul className="list-disc pl-4 space-y-1.5">
              <li>Input negative numbers in Quantity fields.</li>
              <li>Type extremely long coupon codes.</li>
              <li>Use the special coupon code 'QA999'.</li>
              <li>Click the checkout button multiple times quickly.</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Interactive Mock Checkout App */}
        <div className="lg:col-span-8">
          <div
            className={`p-6 sm:p-8 md:p-10 rounded-[2.5rem] border relative overflow-hidden transition-all duration-500 ${
              isPlaying
                ? "bg-slate-900 border-blue-500/30 text-white shadow-2xl shadow-blue-900/10"
                : "bg-slate-100 border-slate-200 text-slate-800 opacity-60 pointer-events-none"
            }`}
          >
            {/* Ambient background light when active */}
            {isPlaying && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            )}

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                Humana Pharmacy Checkout (QA Sandbox)
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1.5 text-xs text-green-400 font-bold animate-pulse">
                  <span className="w-2 h-2 bg-green-400 rounded-full" /> Sandbox Live
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Product Info & Controls */}
              <div className="md:col-span-7 flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-display">Humana Premium Health Kit</h4>
                    <p className="text-xs text-slate-400">Model ID: HUM-2026-X</p>
                  </div>
                </div>

                {/* Quantity Input with Bug 1 Target */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="quantity-field"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Qty"
                      className="bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold w-24 focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-xs text-slate-400">× $29.99 / item</span>
                  </div>
                </div>

                {/* Promo Code with Bug 4 Target Container */}
                <div id="promo-container" className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Promo Code
                  </label>
                  <div className="flex gap-2 min-w-0">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. QA999"
                      className="bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex-1 focus:outline-none focus:border-blue-500 min-w-0"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-red-400 text-xs font-bold mt-1">{promoError}</p>}
                  {appliedPromo && (
                    <p className="text-green-400 text-xs font-bold mt-1">
                      Promo '{appliedPromo}' Applied Successfully!
                    </p>
                  )}
                </div>
              </div>

              {/* Price Details Breakdown */}
              <div className="md:col-span-5 flex flex-col justify-between p-6 bg-slate-850 rounded-3xl border border-slate-800">
                <div className="space-y-4">
                  <h5 className="font-bold text-sm uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                    Order Summary
                  </h5>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal:</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Tax (8%):</span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-red-400">
                      <span>Discount:</span>
                      <span className="font-bold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-slate-800 pt-3 text-base">
                    <span className="font-bold text-slate-200">Grand Total:</span>
                    <span className="font-black text-blue-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    id="place-order-btn"
                    onClick={handleCheckoutClick}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-xl font-black text-sm transition-all hover:scale-[1.02] shadow-lg shadow-green-600/10 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="animate-spin" size={16} /> Submitting Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sandbox Console Logs Window */}
            <div className="mt-8 bg-black/50 border border-slate-850 rounded-2xl p-4 font-mono text-[10px] text-slate-400 h-28 overflow-y-auto flex flex-col gap-1.5">
              <span className="text-[9px] font-black text-slate-500 uppercase border-b border-slate-850 pb-1 mb-1">
                Local Sandbox Logs:
              </span>
              {orderLogs.length === 0 ? (
                <span className="italic text-slate-600">Waiting for actions...</span>
              ) : (
                orderLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes("WARNING")
                        ? "text-yellow-400"
                        : log.includes("Successfully")
                        ? "text-green-400"
                        : "text-slate-400"
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-green-500/30 p-8 md:p-12 rounded-[2.5rem] max-w-xl text-center flex flex-col items-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-500/5">
                <ShieldCheck size={48} />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-4">
                Lead QA status Unlocked!
              </h3>
              <p className="text-sm md:text-base text-slate-400 mb-8 leading-relaxed">
                Outstanding! You have successfully identified and analyzed all 4 hidden defects in the checkout widget. The application security is verified.
              </p>
              <div className="flex gap-4 w-full">
                <button
                  onClick={resetPlayground}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-3.5 rounded-xl transition-all"
                >
                  Play Again
                </button>
                <button
                  onClick={() => setShowCelebration(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Bug Findings Modal */}
      <AnimatePresence>
        {activeBugDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#1a1c22] border border-blue-500/20 p-6 md:p-8 rounded-[2rem] max-w-2xl w-full text-left relative overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full mb-3 border border-yellow-500/20">
                    <AlertTriangle size={10} /> Bug Discovered
                  </span>
                  <h3 className="text-xl md:text-2xl font-black font-display text-white">
                    {activeBugDetail.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveBugDetail(null)}
                  className="w-8 h-8 rounded-full bg-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                <div>
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">
                    QA Severity Impact
                  </h4>
                  <span
                    className={`inline-block font-black px-2 py-0.5 rounded text-[10px] ${
                      activeBugDetail.severity === "CRITICAL"
                        ? "bg-red-600 text-white"
                        : activeBugDetail.severity === "HIGH"
                        ? "bg-orange-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {activeBugDetail.severity}
                  </span>
                </div>

                <div>
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">
                    Functional Analysis
                  </h4>
                  <p>{activeBugDetail.description}</p>
                </div>

                <div>
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">
                    Steps to Reproduce
                  </h4>
                  <p className="whitespace-pre-line bg-black/30 p-3 rounded-lg border border-white/5 font-mono text-[11px] text-slate-400">
                    {activeBugDetail.howToTest}
                  </p>
                </div>

                <div>
                  <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">
                    Automated Test Assertion (QA Engineering Fix)
                  </h4>
                  <pre className="bg-black/50 p-3 rounded-lg border border-white/5 font-mono text-[11px] overflow-x-auto text-blue-400">
                    <code>{activeBugDetail.automationTest}</code>
                  </pre>
                </div>
              </div>

              <button
                onClick={() => setActiveBugDetail(null)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm transition-all"
              >
                Return to Sandbox
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
