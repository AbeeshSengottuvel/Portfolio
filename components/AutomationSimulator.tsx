import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Terminal, ShieldCheck, Cpu, AlertTriangle } from "lucide-react";

interface LogLine {
  text: string;
  type: "info" | "pass" | "warn" | "error" | "success";
  time: string;
}

export const AutomationSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<"ui" | "api">("ui");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ passed: 0, failed: 0, time: "0.0s" });
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const uiSuiteLogs = [
    { text: "[INFO] [WebDriver] Launching headless Chrome browser...", type: "info" },
    { text: "[INFO] [WebDriver] Browser window maximized, viewport set to 1920x1080", type: "info" },
    { text: "[INFO] [Navigation] Navigating to Humana customer portal: https://humana.com/login", type: "info" },
    { text: "[PASS] [Assertion] Page title matches expected 'Humana Sign In' (took 45ms)", type: "pass" },
    { text: "[INFO] [UIAction] Locating email field and inserting username: 'test_user_humana'", type: "info" },
    { text: "[INFO] [UIAction] Locating password field and entering secure credentials...", type: "info" },
    { text: "[INFO] [UIAction] Clicking the primary 'Sign In' form button", type: "info" },
    { text: "[INFO] [Navigation] Redirecting to user homepage dashboard...", type: "info" },
    { text: "[PASS] [Assertion] URL contains '/dashboard/home' (took 180ms)", type: "pass" },
    { text: "[PASS] [Assertion] Profile badge element is visible on page", type: "pass" },
    { text: "[SUCCESS] UI Suite Complete. 3/3 Assertions passed. Run Time: 2.8s", type: "success" },
  ];

  const apiSuiteLogs = [
    { text: "[INFO] [APIClient] Instantiating RestClient for Humana Claims Endpoint...", type: "info" },
    { text: "[INFO] [APIClient] Injecting OAuth Bearer Token into HTTP headers", type: "info" },
    { text: "[INFO] [Request] Sending GET request to /api/claims/v1/user/active-claims", type: "info" },
    { text: "[PASS] [Assertion] Response Status Code matches 200 OK (took 15ms)", type: "pass" },
    { text: "[INFO] [Response] Parsing response body (JSON payload format)...", type: "info" },
    { text: "[PASS] [Assertion] Root array contains 'claims' collection. Size: 5 (took 5ms)", type: "pass" },
    { text: "[INFO] [Validation] Initiating JSON Schema Validation...", type: "info" },
    { text: "[PASS] [Assertion] JSON Schema conforms completely to claims.schema.json", type: "pass" },
    { text: "[INFO] [Request] Sending POST request to create draft claim...", type: "info" },
    { text: "[PASS] [Assertion] Draft claim created: ID=CLM9047722626, Status=DRAFT (took 120ms)", type: "pass" },
    { text: "[SUCCESS] API Suite Complete. 5/5 Assertions passed. Run Time: 1.1s", type: "success" },
  ];

  const activeLogs = selectedSuite === "ui" ? uiSuiteLogs : apiSuiteLogs;

  const startAutomation = () => {
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    setStats({ passed: 0, failed: 0, time: "0.0s" });

    let currentLogIndex = 0;
    const totalLogs = activeLogs.length;

    const interval = setInterval(() => {
      if (currentLogIndex < totalLogs) {
        const item = activeLogs[currentLogIndex];
        const timestamp = new Date().toLocaleTimeString().split(" ")[0];
        
        setLogs((prev) => [
          ...prev,
          { text: item.text, type: item.type as any, time: timestamp },
        ]);

        setProgress(((currentLogIndex + 1) / totalLogs) * 100);

        if (item.type === "pass") {
          setStats((prev) => ({ ...prev, passed: prev.passed + 1 }));
        }

        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setStats((prev) => ({
          ...prev,
          time: selectedSuite === "ui" ? "2.8s" : "1.1s",
        }));
      }
    }, 700);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <section id="automation-runner" className="py-20 md:py-32 scroll-mt-20">
      <div className="mb-12 md:mb-16 text-center lg:text-left">
        <h2 className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter">
          Live Automation Simulator
        </h2>
        <p className="text-base md:text-lg max-w-xl text-slate-500 dark:text-slate-400 mb-6">
          See automated quality engineering in action. Choose a test suite below and launch the executor to see assertions, logs, and validations compile live.
        </p>
        <div className="w-20 md:w-32 h-1.5 md:h-2 bg-blue-600 rounded-full mx-auto lg:mx-0"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Controller Console */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-slate-500/10 bg-white dark:bg-white/5">
          <div>
            <h3 className="text-xl font-bold font-display flex items-center gap-2 mb-6">
              <Cpu className="text-blue-600 dark:text-blue-400" />
              Test Runner Panel
            </h3>

            {/* Test Selection Radio */}
            <div className="space-y-3 mb-8">
              <button
                disabled={isRunning}
                onClick={() => setSelectedSuite("ui")}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left font-bold transition-all ${
                  selectedSuite === "ui"
                    ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400"
                    : "bg-slate-50 border-black/5 dark:bg-white/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                <div>
                  <p className="text-sm">Web UI Suite</p>
                  <p className="text-[10px] text-slate-400 font-medium">Selenium C# Framework</p>
                </div>
                <span className="text-xs">3 Tests</span>
              </button>

              <button
                disabled={isRunning}
                onClick={() => setSelectedSuite("api")}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left font-bold transition-all ${
                  selectedSuite === "api"
                    ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400"
                    : "bg-slate-50 border-black/5 dark:bg-white/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                <div>
                  <p className="text-sm">REST API Suite</p>
                  <p className="text-[10px] text-slate-400 font-medium">RestSharp Schema Tests</p>
                </div>
                <span className="text-xs">5 Tests</span>
              </button>
            </div>

            {/* Metric Displays */}
            <div className="grid grid-cols-3 gap-3 mb-8 text-center">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-500/5 p-3.5 rounded-xl">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Passed</p>
                <p className="text-lg font-black text-green-500">{stats.passed}</p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-500/5 p-3.5 rounded-xl">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Failed</p>
                <p className="text-lg font-black text-red-500">{stats.failed}</p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-500/5 p-3.5 rounded-xl">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Duration</p>
                <p className="text-lg font-black text-blue-500">{stats.time}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={startAutomation}
              disabled={isRunning}
              className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                isRunning
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              }`}
            >
              <Play size={16} /> Run Test Automation
            </button>
          </div>
        </div>

        {/* Right Side: Simulated Terminal Console */}
        <div className="lg:col-span-8 flex flex-col rounded-3xl border border-slate-900 bg-slate-950 text-slate-200 overflow-hidden shadow-2xl min-h-[380px]">
          {/* Terminal Header */}
          <div className="bg-[#14151a] px-5 py-3.5 border-b border-slate-900 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-blue-500" />
              <span className="font-mono text-xs font-bold text-slate-400">
                QA-Automation-Executor v2.4
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
          </div>

          {/* Console logs body */}
          <div className="flex-1 p-5 font-mono text-[11px] md:text-xs overflow-y-auto space-y-2.5 leading-relaxed bg-[#0c0d12]">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 text-center py-20">
                <Terminal size={40} className="mb-3 opacity-30" />
                <p>Click 'Run Test Automation' to launch testing sequence.</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex gap-3 items-start select-none">
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span
                    className={
                      log.type === "pass"
                        ? "text-green-400 font-bold"
                        : log.type === "success"
                        ? "text-blue-400 font-black border-t border-slate-900 pt-1.5 w-full block"
                        : "text-slate-300"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Bottom Execution Bar */}
          {isRunning && (
            <div className="bg-[#14151a] p-3 border-t border-slate-900">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1.5 px-1 font-mono">
                <span>Executing Assertions...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
