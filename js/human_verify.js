setTimeout(function () {
	const EVENT_HUMAN_VERIFICATION_SUCCESS = "human_verification_success";
	const STORAGE_KEY = "human_verified";

	if (localStorage.getItem(STORAGE_KEY)) {
		gtag('event', EVENT_HUMAN_VERIFICATION_SUCCESS, {
			human_verified_before: true
		});
		return;
	}

	// ========================
	// ---- 可配置参数 ----
	// ========================
	const CONFIG = {
		DEBUG: (1 * localStorage.getItem('DEBUG_human_verify')) || 0, // 1 = 模拟GA4
		INITIAL_REQUIRED_COUNT: 2,      // 初始“tap human”次数
		ROBOT_PENALTY_STEP: 1,          // 点击 robot 时增加的 requiredCount 步进
		MIN_RATIO: 0.12,                // human 圆最小半径比例
		ROBOT_SCALE: 1.35,              // robot 圆相对于 human 圆的倍数
		SAFE_GAP_RATIO: 0.05,           // 圆圈之间最小间距比例
		MIN_CLICK_INTERVAL: 120          // 连续点击判定为过快的毫秒
	};

	const HUMAN_TEXT = "I am human";
	const ROBOT_TEXT = "I am a robot";

	let successCount = 0;
	let requiredCount = CONFIG.INITIAL_REQUIRED_COUNT;
	let totalAttempts = 0;

	let human = {};
	let robot = {};

	let startTime = performance.now();
	let lastClickTime = startTime;
	let message = "";
	let messageUntil = 0;

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	Object.assign(canvas.style, {
		position: "fixed",
		left: "0",
		top: "0",
		width: "100vw",
		height: "100vh",
		zIndex: 999999,
		pointerEvents: "auto"
	});

	document.body.appendChild(canvas);

	const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
	function isDarkMode() { return themeQuery.matches; }
	themeQuery.addEventListener("change", draw);

	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }

	function logGA(eventName, params) {
		if (CONFIG.DEBUG) {
			console.log("[GA4_SIM]", eventName, params);
		} else {
			gtag('event', eventName, params);
		}
	}

	// ========================
	// ---- Canvas & Circle Logic ----
	// ========================
	function resize() {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		generateCircles();
		draw();
	}

	window.addEventListener("resize", resize);
	function random(min, max) { return Math.random() * (max - min) + min; }

	function generateCircles() {
		const w = window.innerWidth;
		const h = window.innerHeight;
		const base = Math.min(w, h);
		const humanR = base * CONFIG.MIN_RATIO;
		const robotR = humanR * CONFIG.ROBOT_SCALE;
		const safeGap = base * CONFIG.SAFE_GAP_RATIO;

		const titleSize = Math.max(20, Math.min(36, w * 0.028));
		const subSize = Math.max(14, Math.min(20, w * 0.018));
		const topHeight = titleSize + subSize * 2 + 40;

		function randomCircle(r) {
			return { r, x: random(r, w - r), y: random(r + topHeight, h - r) };
		}

		let valid = false;
		while (!valid) {
			human = randomCircle(humanR);
			robot = randomCircle(robotR);
			const dx = human.x - robot.x, dy = human.y - robot.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			valid = dist > human.r + robot.r + safeGap;
		}
	}

	function drawBackground() {
		ctx.fillStyle = isDarkMode() ? "#000" : "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function drawTopMessage() {
		const w = window.innerWidth;
		const titleSize = Math.max(20, Math.min(36, w * 0.028));
		const subSize = Math.max(14, Math.min(20, w * 0.018));

		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillStyle = isDarkMode() ? "#eee" : "#222";
		ctx.font = `${titleSize}px sans-serif`;
		ctx.fillText("Quick human check", w / 2, 20);
		ctx.font = `${subSize}px sans-serif`;
		ctx.fillStyle = isDarkMode() ? "#ccc" : "#444";
		ctx.fillText(`Tap "I am human" ${requiredCount} times`, w / 2, 20 + titleSize + 6);
		ctx.fillText(`Progress: ${successCount} / ${requiredCount}`, w / 2, 20 + titleSize + subSize + 16);

		if (Date.now() < messageUntil) {
			ctx.fillStyle = "#e67e22";
			ctx.fillText(message, w / 2, 20 + titleSize + subSize * 2 + 24);
		}
	}

	function drawCircle(c, text, color) {
		ctx.beginPath();
		ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = `${c.r * 0.32}px sans-serif`;
		ctx.fillText(text, c.x, c.y);
	}

	function draw() {
		drawBackground();
		drawTopMessage();
		const humanColor = isDarkMode() ? "#27ae60" : "#2ecc71";
		const robotColor = isDarkMode() ? "#c0392b" : "#e74c3c";
		drawCircle(robot, ROBOT_TEXT, robotColor);
		drawCircle(human, HUMAN_TEXT, humanColor);
	}

	function inside(c, x, y) { return (x - c.x) ** 2 + (y - c.y) ** 2 <= c.r ** 2; }
	function showMessage(text) { message = text; messageUntil = Date.now() + 1200; }

	// ========================
	// ---- GA4 Event Trigger ----
	// ========================
	function sendEvent(eventName, extra = {}) {
		const params = {
			click_count: successCount,
			required_count: requiredCount,
			dark_mode: isDarkMode(),
			screen_width: window.innerWidth,
			screen_height: window.innerHeight,
			total_attempts: totalAttempts,
			duration_ms: performance.now() - startTime,
			...extra
		};
		logGA(eventName, params);
	}

	// ========================
	// ---- Canvas Click ----
	// ========================
	canvas.addEventListener("click", (e) => {
		const now = performance.now();
		const interval = now - lastClickTime;
		lastClickTime = now;
		totalAttempts++;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (interval < CONFIG.MIN_CLICK_INTERVAL) {
			successCount = 0;
			showMessage("Too fast — slow down");
			sendEvent("human_verification_failed_fast_click", { interval_ms: interval });
			generateCircles(); draw(); return;
		}

		if (inside(human, x, y)) {
			successCount++;
			showMessage("Good");
			sendEvent("human_circle_clicked", { interval_ms: interval });

			if (successCount >= requiredCount) {
				localStorage.setItem(STORAGE_KEY, "1");
				showMessage("Verified ✓");
				sendEvent(EVENT_HUMAN_VERIFICATION_SUCCESS, { interval_ms: interval });
				draw();
				setTimeout(() => { canvas.remove(); window.removeEventListener("resize", resize); }, 400);
				return;
			}

		} else if (inside(robot, x, y)) {
			requiredCount += CONFIG.ROBOT_PENALTY_STEP; // 可配置步进
			successCount = 0;
			showMessage("Robot tapped — difficulty increased");
			sendEvent("robot_circle_clicked", { interval_ms: interval });

		} else {
			successCount = 0;
			showMessage("Wrong target — try again");
			sendEvent("miss_clicked", { interval_ms: interval });
		}

		generateCircles(); draw();
	});

	// ========================
	// ---- Init ----
	// ========================
	sendEvent("human_verification_started");
	resize();

}, 3000);