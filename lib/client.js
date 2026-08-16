window.__ModuleLoader__.load({
	id: "dsh-live2d-afterglow",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region src/client/waifu/config.js
		function readStoredId(key) {
			const value = parseInt(localStorage.getItem(key), 10);
			return Number.isNaN(value) || value < 0 ? null : value;
		}
		let modelId = readStoredId("modelId");
		let modelTexturesId = readStoredId("modelTexturesId");
		let config = {};
		let messageArray = [];
		function getModelId() {
			if (modelId === null || modelId === void 0) resetModelState();
			return modelId;
		}
		function setModelId(newModelId) {
			modelId = newModelId;
			localStorage.setItem("modelId", newModelId.toString());
		}
		function getModelTexturesId() {
			if (modelTexturesId === null || modelTexturesId === void 0) resetModelState();
			return modelTexturesId;
		}
		function setModelTexturesId(newModelTexturesId) {
			modelTexturesId = newModelTexturesId;
			localStorage.setItem("modelTexturesId", newModelTexturesId.toString());
		}
		function resetModelState() {
			modelId = 0;
			modelTexturesId = 0;
			localStorage.setItem("modelId", "0");
			localStorage.setItem("modelTexturesId", "0");
		}
		function getConfig() {
			return config;
		}
		function setConfig(newConfig) {
			config = newConfig;
		}
		function getMessageArray() {
			return messageArray;
		}
		function updateMessageArray(result) {
			messageArray = result.message.default[getModelId()];
			result.seasons.forEach(({ date, text }) => {
				const now = /* @__PURE__ */ new Date(), nowMonth = now.getMonth() + 1, nowDate = now.getDate(), after = date.split("-")[0], afterMonth = parseInt(after.split("/")[0]), afterDate = parseInt(after.split("/")[1]), before = date.split("-")[1] || after, beforeMonth = parseInt(before.split("/")[0]), beforeDate = parseInt(before.split("/")[1]);
				const isCrossYear = afterMonth > beforeMonth;
				let isInRange = false;
				if (isCrossYear) isInRange = nowMonth > afterMonth || nowMonth === afterMonth && nowDate >= afterDate || nowMonth < beforeMonth || nowMonth === beforeMonth && nowDate <= beforeDate;
				else isInRange = (nowMonth > afterMonth || nowMonth === afterMonth && nowDate >= afterDate) && (nowMonth < beforeMonth || nowMonth === beforeMonth && nowDate <= beforeDate);
				if (isInRange) for (let t of text[getModelId()]) messageArray.push(t);
			});
			result.time.forEach(({ hour, text }) => {
				const now = /* @__PURE__ */ new Date(), after = hour.split("-")[0], before = hour.split("-")[1] || after;
				if (after <= now.getHours() && now.getHours() <= before) for (let t of text[getModelId()]) messageArray.push(t);
			});
		}
		//#endregion
		//#region src/client/waifu/utils.js
		function randomSelection(obj) {
			if (Array.isArray(obj)) return obj[Math.floor(Math.random() * obj.length)];
			else if (typeof obj === "number") return Math.floor(Math.random() * obj);
			else return obj;
		}
		//#endregion
		//#region src/client/waifu/message.js
		let messageTimer;
		function showMessage(model, text, timeout, priority) {
			if (!text) return;
			const storedPriority = parseInt(sessionStorage.getItem("waifu-text"), 10);
			if (!Number.isNaN(storedPriority) && storedPriority > priority) return;
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
			text = randomSelection(text);
			sessionStorage.setItem("waifu-text", priority);
			const tips = document.getElementById("waifu-tips");
			if (tips) {
				tips.innerHTML = text.text || "";
				tips.classList.add("waifu-tips-active");
			}
			messageTimer = setTimeout(() => {
				sessionStorage.removeItem("waifu-text");
				if (tips) tips.classList.remove("waifu-tips-active");
			}, timeout);
			if (model && model.model) {
				if (text.motion) try {
					model.model.motion(text.motion);
				} catch (error) {}
				if (text.expression) try {
					model.model.expression(text.expression);
				} catch (error) {}
			}
		}
		/** 清理未完成的气泡定时器（插件卸载 / HMR 重建时调用，防止残留 setTimeout）。 */
		function clearMessageTimer() {
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
		}
		//#endregion
		//#region src/client/waifu/modelList.js
		/**
		* 换装列表（与 assets/model 目录一一对应，段名保持资源原样；显示名由 characters.js 的
		* LABEL_RULES 翻译成中文）。顺序：常服2023 置顶为默认，其余按独立版 BANDORI_MODEL_LIST。
		*/
		const MODEL_LIST = [
			[
				"028_casual-2023",
				"028_2018_dog",
				"028_birthday_2021",
				"028_birthday_2022",
				"028_casual",
				"028_casual_summer",
				"028_casual_summer-2023",
				"028_casual_winter",
				"028_casual_winter-2023",
				"028_collabo_d_3_ur",
				"028_dream_festival",
				"028_dream_festival_2",
				"028_dream_festival_3_ur",
				"028_dream_festival_4_ur",
				"028_event_227_story_02",
				"028_girlparty2019",
				"028_live_default",
				"028_live_event_05_ssr",
				"028_live_event_06_sr",
				"028_live_event_101_ssr",
				"028_live_event_107_sr",
				"028_live_event_113_sr",
				"028_live_event_115_sr",
				"028_live_event_122_sr",
				"028_live_event_129_ssr",
				"028_live_event_136_r",
				"028_live_event_138_ssr",
				"028_live_event_152_ssr",
				"028_live_event_161_sr",
				"028_live_event_169_ssr",
				"028_live_event_16_sr",
				"028_live_event_173_sr",
				"028_live_event_182_r",
				"028_live_event_189_sr",
				"028_live_event_191_ssr",
				"028_live_event_200_sr",
				"028_live_event_211_ssr",
				"028_live_event_217_ssr",
				"028_live_event_218_ur",
				"028_live_event_227_ur",
				"028_live_event_229_ssr",
				"028_live_event_239_ur",
				"028_live_event_247_r",
				"028_live_event_258_sr",
				"028_live_event_25_r",
				"028_live_event_268_ur",
				"028_live_event_277_r",
				"028_live_event_279_ssr",
				"028_live_event_27_ssr",
				"028_live_event_285_ur",
				"028_live_event_294_r",
				"028_live_event_299_ur",
				"028_live_event_306_ur",
				"028_live_event_320_ssr",
				"028_live_event_328_ur",
				"028_live_event_336_sr",
				"028_live_event_36_ssr",
				"028_live_event_37_sr",
				"028_live_event_42_r",
				"028_live_event_45_r",
				"028_live_event_49_ssr",
				"028_live_event_51_sr",
				"028_live_event_54_ssr",
				"028_live_event_58_r",
				"028_live_event_62_sr",
				"028_live_event_74_sr",
				"028_live_event_75_ssr",
				"028_live_event_78_sr",
				"028_live_event_80_r",
				"028_live_event_85_sr",
				"028_live_event_94_ssr",
				"028_live_event_95_sr",
				"028_live_event_99_r",
				"028_live_r_2018",
				"028_live_r_2019",
				"028_live_r_2020",
				"028_live_r_2021",
				"028_live_r_2022",
				"028_live_r_2023",
				"028_live_sr_01",
				"028_memorial_middle_school",
				"028_miku_lostone",
				"028_pajamas-2023",
				"028_precious_summer",
				"028_school_summer",
				"028_school_summer-2023",
				"028_school_winter-2023",
				"028_school_winter_s2",
				"028_swimsuit-2023"
			],
			[
				"023_casual-2023",
				"023_2018_dog",
				"023_2nd_general_election_r",
				"023_birthday_2021",
				"023_birthday_2022",
				"023_casual",
				"023_casual_summer",
				"023_casual_summer-2023",
				"023_casual_winter",
				"023_casual_winter-2023",
				"023_dream_festival",
				"023_dream_festival_2",
				"023_dream_festival_3_ur",
				"023_dream_festival_4_ur",
				"023_event_06_story",
				"023_live_default",
				"023_live_event_06_ssr",
				"023_live_event_103_sr",
				"023_live_event_107_sr",
				"023_live_event_108_ssr",
				"023_live_event_115_r",
				"023_live_event_122_ssr",
				"023_live_event_128_sr",
				"023_live_event_129_sr",
				"023_live_event_136_sr",
				"023_live_event_152_r",
				"023_live_event_155_ssr",
				"023_live_event_159_sr",
				"023_live_event_161_r",
				"023_live_event_163_r",
				"023_live_event_169_ssr",
				"023_live_event_16_sr",
				"023_live_event_177_sr",
				"023_live_event_182_ssr",
				"023_live_event_189",
				"023_live_event_200_ssr",
				"023_live_event_211",
				"023_live_event_218_r",
				"023_live_event_229_sr",
				"023_live_event_238_r",
				"023_live_event_239_ur",
				"023_live_event_245_ur",
				"023_live_event_247_ssr",
				"023_live_event_253_sr",
				"023_live_event_258_ur",
				"023_live_event_25_sr",
				"023_live_event_266_ur",
				"023_live_event_268_r",
				"023_live_event_271_ssr",
				"023_live_event_279_ur",
				"023_live_event_27_r",
				"023_live_event_285_r",
				"023_live_event_294_ssr",
				"023_live_event_306_ur",
				"023_live_event_312_ur",
				"023_live_event_320_ur",
				"023_live_event_328_ssr",
				"023_live_event_32_r",
				"023_live_event_336_ur",
				"023_live_event_37_sr",
				"023_live_event_42_ssr",
				"023_live_event_49_sr",
				"023_live_event_54_ssr",
				"023_live_event_62_ssr",
				"023_live_event_73_ssr",
				"023_live_event_75_r",
				"023_live_event_78_ssr",
				"023_live_event_85_sr",
				"023_live_event_94_ssr",
				"023_live_r_2018",
				"023_live_r_2019",
				"023_live_r_2020",
				"023_live_r_2022",
				"023_live_r_2023",
				"023_live_sr_01",
				"023_miku_lostone",
				"023_pajamas-2023",
				"023_precious_summer",
				"023_school_summer",
				"023_school_summer-2023",
				"023_school_winter-2023",
				"023_school_winter_s2",
				"023_swimsuit-2023"
			],
			[
				"010_casual-2023",
				"010_2018_dog",
				"010_birthday_2021",
				"010_birthday_2022",
				"010_casual",
				"010_casual_summer",
				"010_casual_summer-2023",
				"010_casual_winter",
				"010_casual_winter-2023",
				"010_dream_festival",
				"010_dream_festival_2",
				"010_dream_festival_3_ur",
				"010_dream_festival_4_ur",
				"010_event_06_story",
				"010_live_default",
				"010_live_event_06_r",
				"010_live_event_100_sr",
				"010_live_event_107_r",
				"010_live_event_109_sr",
				"010_live_event_115_ssr",
				"010_live_event_118_r",
				"010_live_event_122_r",
				"010_live_event_129_ssr",
				"010_live_event_136_r",
				"010_live_event_144_ssr",
				"010_live_event_14_sr",
				"010_live_event_152_sr",
				"010_live_event_161_ssr",
				"010_live_event_169_sr",
				"010_live_event_16_ssr",
				"010_live_event_173_ssr",
				"010_live_event_182_sr",
				"010_live_event_189_ssr",
				"010_live_event_191_sr",
				"010_live_event_200_r",
				"010_live_event_206_sr",
				"010_live_event_20_sr",
				"010_live_event_211",
				"010_live_event_218_sr",
				"010_live_event_229_ur",
				"010_live_event_236_ur",
				"010_live_event_239_r",
				"010_live_event_247_ur",
				"010_live_event_24_r",
				"010_live_event_258_ssr",
				"010_live_event_268_ur",
				"010_live_event_274_ur",
				"010_live_event_279_r",
				"010_live_event_27_sr",
				"010_live_event_285_sr",
				"010_live_event_294_sr",
				"010_live_event_296_ur",
				"010_live_event_299_ssr",
				"010_live_event_306_ssr",
				"010_live_event_320_sr",
				"010_live_event_327_r",
				"010_live_event_328_ur",
				"010_live_event_336_r",
				"010_live_event_35_sr",
				"010_live_event_37_ssr",
				"010_live_event_42_r",
				"010_live_event_49_ssr",
				"010_live_event_51_sr",
				"010_live_event_54_sr",
				"010_live_event_58_sr",
				"010_live_event_62_r",
				"010_live_event_63_ssr",
				"010_live_event_68_ssr",
				"010_live_event_75_sr",
				"010_live_event_85_ssr",
				"010_live_event_90_sr",
				"010_live_event_94_sr",
				"010_live_event_99_ssr",
				"010_live_r_2018",
				"010_live_r_2019",
				"010_live_r_2020",
				"010_live_r_2022",
				"010_live_r_2023",
				"010_live_sr_01",
				"010_miku_lostone",
				"010_precious_summer",
				"010_school_summer",
				"010_school_summer-2023",
				"010_school_winter-2023",
				"010_school_winter_s2",
				"010_swimsuit-2023"
			],
			[
				"040_casual-2023",
				"040_2018_dog",
				"040_birthday_2021",
				"040_birthday_2022",
				"040_casual",
				"040_casual_summer",
				"040_casual_summer-2023",
				"040_casual_winter",
				"040_casual_winter-2023",
				"040_dream_festival",
				"040_dream_festival_2",
				"040_dream_festival_3_ur",
				"040_dream_festival_4_ur",
				"040_halloween",
				"040_kirameki_festival",
				"040_live_default",
				"040_live_event_06_r",
				"040_live_event_09_sr",
				"040_live_event_107_ssr",
				"040_live_event_115_sr",
				"040_live_event_122_sr",
				"040_live_event_129_sr",
				"040_live_event_12_ssr",
				"040_live_event_134_r",
				"040_live_event_136_ssr",
				"040_live_event_145_sr",
				"040_live_event_152_ssr",
				"040_live_event_161_ssr",
				"040_live_event_169_r",
				"040_live_event_16_r",
				"040_live_event_171_ssr",
				"040_live_event_179_sr",
				"040_live_event_182_sr",
				"040_live_event_189",
				"040_live_event_200_ssr",
				"040_live_event_211_sr",
				"040_live_event_218_ur",
				"040_live_event_229_r",
				"040_live_event_236_sr",
				"040_live_event_239_ssr",
				"040_live_event_247_ur",
				"040_live_event_258_r",
				"040_live_event_262_ur",
				"040_live_event_268_sr",
				"040_live_event_279_ur",
				"040_live_event_27_sr",
				"040_live_event_281_r",
				"040_live_event_285_ssr",
				"040_live_event_294_ur",
				"040_live_event_29_r",
				"040_live_event_306_sr",
				"040_live_event_320_r",
				"040_live_event_325_ur",
				"040_live_event_328_sr",
				"040_live_event_336_ur",
				"040_live_event_35_r",
				"040_live_event_37_ssr",
				"040_live_event_42_sr",
				"040_live_event_44_ssr",
				"040_live_event_49_sr",
				"040_live_event_51_ssr",
				"040_live_event_54_sr",
				"040_live_event_62_sr",
				"040_live_event_69_ssr",
				"040_live_event_75_sr",
				"040_live_event_78_r",
				"040_live_event_85_ssr",
				"040_live_event_87_r",
				"040_live_event_94_sr",
				"040_live_r_2018",
				"040_live_r_2019",
				"040_live_r_2020",
				"040_live_r_2022",
				"040_live_r_2023",
				"040_live_sr_01",
				"040_memorial_middle_school",
				"040_miku_lostone",
				"040_precious_summer",
				"040_school_summer",
				"040_school_summer-2023",
				"040_school_winter-2023",
				"040_school_winter_s2"
			],
			[
				"043_casual-2023",
				"043_2018_dog",
				"043_2nd_general_election_r",
				"043_arbeit",
				"043_birthday_2021",
				"043_birthday_2022",
				"043_casual",
				"043_casual_summer",
				"043_casual_summer-2023",
				"043_casual_winter",
				"043_casual_winter-2023",
				"043_dream_festival",
				"043_dream_festival_2",
				"043_dream_festival_3_ur",
				"043_dream_festival_4_ur",
				"043_kirameki_festival",
				"043_live_default",
				"043_live_event_05_r",
				"043_live_event_06_sr",
				"043_live_event_107_ssr",
				"043_live_event_115_ssr",
				"043_live_event_122_ssr",
				"043_live_event_129_sr",
				"043_live_event_12_r",
				"043_live_event_136_ssr",
				"043_live_event_144_r",
				"043_live_event_152_sr",
				"043_live_event_159_ssr",
				"043_live_event_161_sr",
				"043_live_event_169_sr",
				"043_live_event_16_r",
				"043_live_event_177_ssr",
				"043_live_event_17_sr",
				"043_live_event_180_sr",
				"043_live_event_182_ssr",
				"043_live_event_189_ssr",
				"043_live_event_200_sr",
				"043_live_event_211_ssr",
				"043_live_event_218_ssr",
				"043_live_event_229_ur",
				"043_live_event_238_ur",
				"043_live_event_239_sr",
				"043_live_event_23_ssr",
				"043_live_event_247_sr",
				"043_live_event_258_ur",
				"043_live_event_263_sr",
				"043_live_event_268_ssr",
				"043_live_event_271_r",
				"043_live_event_277_ur",
				"043_live_event_279_sr",
				"043_live_event_27_r",
				"043_live_event_285_ur",
				"043_live_event_294_ur",
				"043_live_event_306_r",
				"043_live_event_320_ur",
				"043_live_event_328_r",
				"043_live_event_32_sr",
				"043_live_event_336_ssr",
				"043_live_event_37_r",
				"043_live_event_42_ssr",
				"043_live_event_49_sr",
				"043_live_event_54_sr",
				"043_live_event_62_ssr",
				"043_live_event_64_sr",
				"043_live_event_69_sr",
				"043_live_event_71_r",
				"043_live_event_75_ssr",
				"043_live_event_80_sr",
				"043_live_event_84_sr",
				"043_live_event_85_r",
				"043_live_event_90_ssr",
				"043_live_event_94_r",
				"043_live_r_2018",
				"043_live_r_2019",
				"043_live_r_2020",
				"043_live_r_2022",
				"043_live_r_2023",
				"043_live_sr_01",
				"043_memorial_middle_school",
				"043_miku_lostone",
				"043_precious_summer",
				"043_school_summer",
				"043_school_summer-2023",
				"043_school_winter-2023",
				"043_school_winter_s2",
				"043_swimsuit-2023"
			]
		];
		//#endregion
		//#region src/client/waifu/tips.js
		/**
		* Afterglow 台词包（按 5 角色人设撰写；motion 名取自模型实际动作集）。
		* 角色顺序：ran(0) / moca(1) / himari(2) / tomoe(3) / tsugumi(4)。
		*/
		const tips = {
			"message": {
				"default": [
					[
						{
							"text": "哼……今天的练习，还不错吧。",
							"motion": "serious01"
						},
						{
							"text": "我才没有在担心你们呢！",
							"motion": "shame01"
						},
						{
							"text": "Afterglow 的羁绊，可不是嘴上说说的。",
							"motion": "kime01"
						},
						{
							"text": "唱歌的时候，感觉整个世界都是我的。",
							"motion": "smile01"
						},
						{
							"text": "你们几个，别给我拖后腿啊。",
							"motion": "angry01"
						},
						{
							"text": "……谢谢。这句是真的。",
							"motion": "smile02"
						},
						{
							"text": "摩卡那家伙，又在偷偷摸鱼了吧。",
							"motion": "nod01"
						},
						{
							"text": "吉他拨片，又找不到了……",
							"motion": "eeto01"
						},
						{
							"text": "偶尔这样安静地待着，也不错。",
							"motion": "smile03"
						},
						{
							"text": "我会让 Afterglow 变得更强。",
							"motion": "kime01"
						},
						{
							"text": "哼，被夸奖了，心情还不坏。",
							"motion": "smile04"
						},
						{
							"text": "夜晚的风，很舒服。适合唱歌。",
							"motion": "smile05"
						}
					],
					[
						{
							"text": "呀～今天也悠闲地过吧～",
							"motion": "smile01"
						},
						{
							"text": "兰酱，又在逞强了呢～",
							"motion": "wink01"
						},
						{
							"text": "摩卡觉得，偷懒也是一种才能哦～",
							"motion": "smile02"
						},
						{
							"text": "嘿嘿，捉弄绯玛丽最好玩了～",
							"motion": "niyaniya01"
						},
						{
							"text": "吉他……随便弹弹就很帅了吧～",
							"motion": "smile03"
						},
						{
							"text": "啊～肚子饿了～",
							"motion": "gattsu01"
						},
						{
							"text": "摩卡知道的秘密，可不告诉你哦～",
							"motion": "wink01"
						},
						{
							"text": "天上有星星……和摩卡一样亮闪闪～",
							"motion": "smile04"
						},
						{
							"text": "累了的话，就来找摩卡撒娇吧～",
							"motion": "smile02"
						},
						{
							"text": "今天也懒洋洋的，最棒了～",
							"motion": "smile05"
						},
						{
							"text": "偶尔认真一下，吓大家一跳～",
							"motion": "kime01"
						},
						{
							"text": "摩卡最喜欢 Afterglow 了～",
							"motion": "smile06"
						}
					],
					[
						{
							"text": "今天也全力全开！",
							"motion": "smile01"
						},
						{
							"text": "哇～大家快看快看！",
							"motion": "surprised01"
						},
						{
							"text": "绯玛丽今天也元气满满呢！",
							"motion": "smile02"
						},
						{
							"text": "Afterglow 天下第一！",
							"motion": "kime01"
						},
						{
							"text": "啊，肚子饿了，去买面包吃吧！",
							"motion": "gattsu01"
						},
						{
							"text": "运动之后要好好补充水分哦！",
							"motion": "nod01"
						},
						{
							"text": "诶嘿嘿，被夸了！",
							"motion": "smile03"
						},
						{
							"text": "不管遇到什么困难，大家一起就没问题！",
							"motion": "kime01"
						},
						{
							"text": "兰酱虽然很酷，但其实超温柔的！",
							"motion": "wink01"
						},
						{
							"text": "今天也要和大家一起加油！",
							"motion": "smile04"
						},
						{
							"text": "哇，天上有流星！快许愿！",
							"motion": "surprised01"
						},
						{
							"text": "和 Afterglow 的大家一起，每一天都是最棒的！",
							"motion": "smile05"
						}
					],
					[
						{
							"text": "哈！今天也打鼓打个痛快！",
							"motion": "smile01"
						},
						{
							"text": "亚子最近也很努力呢，做姐姐的要好好看着才行。",
							"motion": "nod01"
						},
						{
							"text": "有什么问题就交给我吧！",
							"motion": "kime01"
						},
						{
							"text": "Afterglow 的鼓声，就是我们的心跳！",
							"motion": "kime01"
						},
						{
							"text": "练完鼓，去吃拉面吧！",
							"motion": "gattsu01"
						},
						{
							"text": "大家要和睦相处啊，听到了吗！",
							"motion": "nod02"
						},
						{
							"text": "今天的我状态绝佳！",
							"motion": "smile02"
						},
						{
							"text": "虽然我看起来粗犷，但也很细心的哦。",
							"motion": "smile03"
						},
						{
							"text": "下雨天……鼓声会更好听吗？",
							"motion": "eeto01"
						},
						{
							"text": "大家，别太勉强自己啊。",
							"motion": "serious01"
						},
						{
							"text": "被信赖的感觉，真不错。",
							"motion": "smile04"
						},
						{
							"text": "Afterglow，永远是最棒的乐队！",
							"motion": "smile05"
						}
					],
					[
						{
							"text": "今天的花，也开得很好呢。",
							"motion": "smile01"
						},
						{
							"text": "大家的笑容，就像阳光一样温暖。",
							"motion": "smile02"
						},
						{
							"text": "这个多肉植物，又长大了一点。",
							"motion": "nod01"
						},
						{
							"text": "键盘的音色，要像流水一样温柔。",
							"motion": "smile03"
						},
						{
							"text": "Afterglow 的大家，都是我重要的伙伴。",
							"motion": "kime01"
						},
						{
							"text": "啊，那个……要喝点茶吗？",
							"motion": "shame01"
						},
						{
							"text": "风信子开花的时候，春天就到了呢。",
							"motion": "smile04"
						},
						{
							"text": "练习虽然辛苦，但很幸福。",
							"motion": "smile02"
						},
						{
							"text": "蔬菜……我也有在好好照顾哦。",
							"motion": "nod02"
						},
						{
							"text": "大家的歌，总能让我安心。",
							"motion": "smile05"
						},
						{
							"text": "今天也一起，好好地演奏吧。",
							"motion": "smile01"
						},
						{
							"text": "月光下的音乐，也很美呢。",
							"motion": "smile03"
						}
					]
				],
				"console": [
					{
						"text": "喂，看什么看？……哼，随便你。",
						"motion": "angry01"
					},
					{
						"text": "呀～被发现了～摩卡什么都没做哦～",
						"motion": "wink01"
					},
					{
						"text": "哇！有人在偷看！绯玛丽会害羞的啦！",
						"motion": "surprised01"
					},
					{
						"text": "哦？在看我们吗？要看就光明正大地看！",
						"motion": "smile01"
					},
					{
						"text": "啊……被看到了……有点不好意思呢……",
						"motion": "shame01"
					}
				],
				"copy": [
					{
						"text": "复制了什么？……哼，随你便。",
						"motion": "serious01"
					},
					{
						"text": "复制……是把别人的话拿来用吗？摩卡也会哦～",
						"motion": "smile02"
					},
					{
						"text": "复制！像复印机一样咔嚓咔嚓！",
						"motion": "smile01"
					},
					{
						"text": "复制？嗯，记住就好。",
						"motion": "nod01"
					},
					{
						"text": "复制……要注意版权哦？",
						"motion": "smile02"
					}
				],
				"visibilitychange": [
					{
						"text": "回来得真慢。……哼，等你很久了。",
						"motion": "nod01"
					},
					{
						"text": "欢迎回来～摩卡等得都快睡着了～",
						"motion": "smile01"
					},
					{
						"text": "欢迎回来！快来一起玩！",
						"motion": "smile02"
					},
					{
						"text": "哦，回来了！正好要开始练习！",
						"motion": "smile01"
					},
					{
						"text": "欢迎回来。要喝杯茶休息一下吗？",
						"motion": "smile02"
					}
				]
			},
			"mouseover": [
				{
					"selector": "#waifu-tool-switch-model",
					"text": [
						{
							"text": "换人？……哼，随你。",
							"motion": "nod02"
						},
						{
							"text": "要换吗～摩卡会想你的～",
							"motion": "smile01"
						},
						{
							"text": "诶——要换人吗？绯玛丽会很寂寞的！",
							"motion": "sad01"
						},
						{
							"text": "换人？好吧，随时欢迎回来。",
							"motion": "smile01"
						},
						{
							"text": "要换一个伙伴吗？",
							"motion": "smile01"
						}
					]
				},
				{
					"selector": "#waifu-tool-photo",
					"text": [
						{
							"text": "拍照？……别拍奇怪的角度。",
							"motion": "serious01"
						},
						{
							"text": "拍照～摩卡要摆个可爱的姿势～",
							"motion": "wink01"
						},
						{
							"text": "拍照！要拍出最闪亮的瞬间！",
							"motion": "smile02"
						},
						{
							"text": "拍照？好，来吧！",
							"motion": "smile01"
						},
						{
							"text": "拍照……我会紧张的……",
							"motion": "shame01"
						}
					]
				},
				{
					"selector": "#waifu-tool-info",
					"text": [
						{
							"text": "想知道 Afterglow 的事？哼，说说也无妨。",
							"motion": "smile01"
						},
						{
							"text": "关于摩卡的事～是秘密哦～",
							"motion": "wink01"
						},
						{
							"text": "想知道绯玛丽的事吗？问吧问吧！",
							"motion": "smile02"
						},
						{
							"text": "Afterglow 的鼓手就是我！",
							"motion": "kime01"
						},
						{
							"text": "我的事……没什么特别的啦。",
							"motion": "smile01"
						}
					]
				},
				{
					"selector": "#waifu-tool-quit",
					"text": [
						{
							"text": "要走了？……嗯，下次见。",
							"motion": "nod01"
						},
						{
							"text": "要走了吗～摩卡会寂寞的～",
							"motion": "sad01"
						},
						{
							"text": "诶——要走了吗！下次一定要再来哦！",
							"motion": "sad01"
						},
						{
							"text": "要走了？好，下次再一起演奏！",
							"motion": "smile01"
						},
						{
							"text": "再见……要保重哦。",
							"motion": "smile01"
						}
					]
				}
			],
			"seasons": [
				{
					"date": "01/01",
					"text": [
						{
							"text": "新年……今年也要把 Afterglow 带到更高的地方。",
							"motion": "kime01"
						},
						{
							"text": "新年快乐～今年也要悠闲地过～",
							"motion": "smile01"
						},
						{
							"text": "新年快乐！今年也全力全开！",
							"motion": "smile01"
						},
						{
							"text": "新年！今年也要打个痛快！",
							"motion": "smile02"
						},
						{
							"text": "新年快乐。今年也请多关照。",
							"motion": "smile01"
						}
					]
				},
				{
					"date": "02/14",
					"text": [
						{
							"text": "情人节？……哼，我才没兴趣。",
							"motion": "shame01"
						},
						{
							"text": "情人节～摩卡想收很多巧克力～",
							"motion": "smile02"
						},
						{
							"text": "情人节！要送谁巧克力好呢！",
							"motion": "smile03"
						},
						{
							"text": "情人节……给亚子买点巧克力吧。",
							"motion": "nod01"
						},
						{
							"text": "我烤了巧克力曲奇，要尝尝吗？",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "03/14",
					"text": [
						{
							"text": "回礼？……哼，准备好了。",
							"motion": "serious01"
						},
						{
							"text": "回礼～送摩卡软糖就好了～",
							"motion": "wink01"
						},
						{
							"text": "白色情人节！要好好回礼哦！",
							"motion": "smile01"
						},
						{
							"text": "回礼……嗯，给大家都买一份吧。",
							"motion": "nod02"
						},
						{
							"text": "做了曲奇当回礼，希望合大家口味。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "06/01-08/31",
					"text": [
						{
							"text": "夏天……live 的季节。点燃全场吧。",
							"motion": "kime01"
						},
						{
							"text": "夏天～好热～摩卡要融化了～",
							"motion": "sad01"
						},
						{
							"text": "夏天！海边！live！",
							"motion": "smile02"
						},
						{
							"text": "夏天就是热血！大汗淋漓地打鼓吧！",
							"motion": "smile01"
						},
						{
							"text": "夏天的花朵，开得很灿烂呢。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "09/01-11/30",
					"text": [
						{
							"text": "秋天……适合唱抒情的歌。",
							"motion": "smile02"
						},
						{
							"text": "秋天～是食欲之秋～摩卡最爱的季节～",
							"motion": "smile03"
						},
						{
							"text": "秋天！运动会的季节！",
							"motion": "smile01"
						},
						{
							"text": "秋天……清爽的风，适合跑步。",
							"motion": "nod01"
						},
						{
							"text": "秋天的红叶，像火焰一样美丽。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "12/01-02/29",
					"text": [
						{
							"text": "冬天……冷风让嗓子更清醒。",
							"motion": "smile01"
						},
						{
							"text": "冬天～想窝在被炉里～",
							"motion": "smile01"
						},
						{
							"text": "冬天！要小心别感冒哦！",
							"motion": "nod01"
						},
						{
							"text": "冬天……打完鼓泡个澡，最爽了。",
							"motion": "smile02"
						},
						{
							"text": "冬天，温室里的花也要好好照顾。",
							"motion": "smile01"
						}
					]
				},
				{
					"date": "12/24-12/26",
					"text": [
						{
							"text": "圣诞……哼，还算热闹。",
							"motion": "nod01"
						},
						{
							"text": "圣诞～摩卡想要礼物～",
							"motion": "smile02"
						},
						{
							"text": "圣诞快乐！礼物礼物！",
							"motion": "surprised01"
						},
						{
							"text": "圣诞……给亚子准备个惊喜吧。",
							"motion": "smile02"
						},
						{
							"text": "圣诞快乐。我装饰了房间哦。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "12/31",
					"text": [
						{
							"text": "今年也辛苦了。明年继续。",
							"motion": "serious01"
						},
						{
							"text": "跨年～今年也过得很快呢～",
							"motion": "smile01"
						},
						{
							"text": "今年也辛苦啦！明年继续加油！",
							"motion": "smile01"
						},
						{
							"text": "跨年……今年打了一整年的鼓呢。",
							"motion": "nod01"
						},
						{
							"text": "一年辛苦了。明年也请多关照。",
							"motion": "smile01"
						}
					]
				}
			],
			"time": [
				{
					"hour": "6-7",
					"text": [
						{
							"text": "早。……起这么早，是有 live 吗？",
							"motion": "smile01"
						},
						{
							"text": "早～……好困～摩卡要再睡一会～",
							"motion": "sleep01"
						},
						{
							"text": "早上好！今天也要元气满满！",
							"motion": "smile01"
						},
						{
							"text": "早！晨练跑了一圈！",
							"motion": "smile01"
						},
						{
							"text": "早上好。给花浇了水。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "8-11",
					"text": [
						{
							"text": "上午……练习吗？来吧。",
							"motion": "kime01"
						},
						{
							"text": "上午～摩卡还在发呆～",
							"motion": "eeto01"
						},
						{
							"text": "上午好！一起去做点什么吧！",
							"motion": "smile02"
						},
						{
							"text": "上午……正好练练鼓。",
							"motion": "nod01"
						},
						{
							"text": "上午好。要喝杯茶吗？",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "12-13",
					"text": [
						{
							"text": "午饭……随便吃点吧。",
							"motion": "serious01"
						},
						{
							"text": "午饭～摩卡要吃很多～",
							"motion": "gattsu01"
						},
						{
							"text": "午饭时间！面包配牛奶！",
							"motion": "smile01"
						},
						{
							"text": "午饭……来碗拉面吧！",
							"motion": "gattsu01"
						},
						{
							"text": "午饭……便当要好好吃哦。",
							"motion": "smile02"
						}
					]
				},
				{
					"hour": "14-16",
					"text": [
						{
							"text": "下午……练声的时间。",
							"motion": "kime01"
						},
						{
							"text": "下午～懒洋洋的午后～",
							"motion": "smile01"
						},
						{
							"text": "下午好！要不要去逛街！",
							"motion": "smile02"
						},
						{
							"text": "下午……该认真打鼓了。",
							"motion": "nod02"
						},
						{
							"text": "下午……在庭院里休息吧。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "17-19",
					"text": [
						{
							"text": "傍晚……夕阳配歌声，不错。",
							"motion": "smile02"
						},
						{
							"text": "傍晚～星星快出来了～",
							"motion": "smile02"
						},
						{
							"text": "傍晚！今天的练习开始啦！",
							"motion": "smile01"
						},
						{
							"text": "傍晚……live 前的热身。",
							"motion": "smile01"
						},
						{
							"text": "傍晚……该准备晚饭了。",
							"motion": "smile02"
						}
					]
				},
				{
					"hour": "20-21",
					"text": [
						{
							"text": "晚上……去 live house 吧。",
							"motion": "smile01"
						},
						{
							"text": "晚上～摩卡最有精神的时候～",
							"motion": "wink01"
						},
						{
							"text": "晚上好！一起看星星吧！",
							"motion": "smile02"
						},
						{
							"text": "晚上……来一场痛快的演奏！",
							"motion": "smile02"
						},
						{
							"text": "晚上……月光很温柔呢。",
							"motion": "smile02"
						}
					]
				},
				{
					"hour": "22-23",
					"text": [
						{
							"text": "这么晚还不睡？……明天还有 live。",
							"motion": "serious01"
						},
						{
							"text": "深夜～摩卡还不困～",
							"motion": "smile01"
						},
						{
							"text": "已经很晚了……但还想再玩一会！",
							"motion": "smile01"
						},
						{
							"text": "这么晚……早点休息，明天再战。",
							"motion": "nod01"
						},
						{
							"text": "已经很晚了，请好好休息。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "0-5",
					"text": [
						{
							"text": "凌晨……喂，快去睡。",
							"motion": "angry01"
						},
						{
							"text": "凌晨～猫头鹰时间～",
							"motion": "eeto01"
						},
						{
							"text": "哇，都这么晚了！该睡了！",
							"motion": "surprised01"
						},
						{
							"text": "凌晨……嗯，晚安。",
							"motion": "nod01"
						},
						{
							"text": "这么晚还不睡，对身体不好哦。",
							"motion": "serious01"
						}
					]
				}
			]
		};
		//#endregion
		//#region src/client/waifu/model.js
		const PIXI = { get Application() {
			return window.PIXI.Application;
		} };
		const Live2DModel = { get value() {
			return window.PIXI.live2d.Live2DModel;
		} };
		/**
		* 适合作为随机待机动作的 motion 组名。
		* 各角色的可用动作集不同，加载时会被过滤成该角色实际存在的集合。
		* （Poppin'Party 模型动作集：smile01-06 / nf01-05 / nnf01-05 / kime01 /
		*   sad01-02 / surprised01-03 / serious01-02 / shame01 / niyaniya01 /
		*   oowarai01 / wink01 / sing01 / nod01-02 / sleep01-02 / eeto01 / jaan01 等）
		*/
		const IDLE_MOTIONS = [
			"smile01",
			"smile02",
			"smile03",
			"smile04",
			"smile05",
			"smile06",
			"thinking01",
			"thinking02",
			"nf01",
			"nf02",
			"nnf01",
			"nnf02",
			"kandou01",
			"kime01",
			"sad01",
			"surprised01",
			"serious01",
			"shame01",
			"niya01",
			"ando01",
			"odoodo01",
			"sigh01",
			"niyaniya01",
			"oowarai01",
			"wink01",
			"sing01",
			"nod01",
			"nod02",
			"sleep01",
			"eeto01",
			"jaan01",
			"gattsu01"
		];
		var Model = class {
			constructor() {
				this.cdnPath = getConfig().cdnPath;
				this.app = new PIXI.Application({
					view: document.getElementById("live2d"),
					autoStart: true,
					width: 800,
					height: 800,
					backgroundAlpha: 0
				});
				this.modelList = MODEL_LIST;
				this.tips = tips;
				this.model = null;
				this.modelIndex = null;
				this.modelMotions = [];
				this.modelExpressions = [];
				this.idleMotions = [];
			}
			async loadModel(modelId, modelTexturesId, message) {
				if (modelId >= this.modelList.length) modelId %= this.modelList.length;
				if (modelTexturesId >= this.modelList[modelId].length) modelTexturesId %= this.modelList[modelId].length;
				setModelId(modelId);
				setModelTexturesId(modelTexturesId);
				console.log(`Live2D Model ${modelId}-${modelTexturesId}`);
				showMessage(this, message, 4e3, 10);
				const target = this.modelList[modelId][modelTexturesId];
				const url = `${this.cdnPath}model/${target}/index.json`;
				try {
					this.modelIndex = await fetch(url).then((response) => {
						if (!response.ok) throw new Error(`HTTP ${response.status}`);
						return response.json();
					});
				} catch (error) {
					console.error(`模型加载失败: ${url}`, error);
					showMessage(this, {
						text: "呜……模型加载失败了，换个衣服试试？",
						motion: "sad01"
					}, 5e3, 10);
					return;
				}
				this.modelIndex.url = url;
				if (!this.modelIndex.motions.idle && this.modelIndex.motions.idle01) this.modelIndex.motions.idle = this.modelIndex.motions.idle01;
				if (Array.isArray(this.modelIndex.expressions) && !this.modelIndex.expressions.find((expression) => expression.name === "idle") && this.modelIndex.expressions.find((expression) => expression.name === "idle01")) this.modelIndex.expressions.push({
					name: "idle",
					file: this.modelIndex.expressions.find((expression) => expression.name === "idle01").file
				});
				this.modelMotions = Object.keys(this.modelIndex.motions || {});
				this.modelExpressions = (this.modelIndex.expressions || []).map((expression) => expression.name);
				this.idleMotions = IDLE_MOTIONS.filter((motion) => this.modelMotions.includes(motion));
				this.app.stage.removeChildren();
				try {
					this.model = await Live2DModel.value.from(this.modelIndex, { motionPreload: getConfig().preload });
				} catch (error) {
					console.error("Live2D 模型渲染初始化失败", error);
					showMessage(this, {
						text: "呜……渲染器罢工了，刷新一下试试？",
						motion: "sad01"
					}, 5e3, 10);
					return;
				}
				this.app.stage.addChild(this.model);
				this.model.scale.set(.33);
				updateMessageArray(this.tips);
			}
			/** 播放一个随机的待机动作（不弹气泡） */
			playRandomIdle() {
				if (!this.model || !this.idleMotions.length) return;
				const motion = this.idleMotions[Math.floor(Math.random() * this.idleMotions.length)];
				try {
					this.model.motion(motion);
				} catch (error) {}
			}
			/** 随机切换一个表情 */
			playRandomExpression() {
				if (!this.model || !this.modelExpressions.length) return;
				const expression = this.modelExpressions[Math.floor(Math.random() * this.modelExpressions.length)];
				try {
					this.model.expression(expression);
				} catch (error) {}
			}
			/** 让模型视线跟随屏幕坐标（canvas 空间，可超出 0~800） */
			focusAt(clientX, clientY) {
				if (!this.model) return;
				const canvas = this.app.view;
				const rect = canvas.getBoundingClientRect();
				if (rect.width === 0 || rect.height === 0) return;
				const x = (clientX - rect.left) * (canvas.width / rect.width);
				const y = (clientY - rect.top) * (canvas.height / rect.height);
				try {
					this.model.focus(x, y);
				} catch (error) {}
			}
			/** 截取当前画面为 PNG dataURL */
			capture() {
				if (!this.model) return null;
				try {
					return this.app.renderer.plugins.extract.canvas(this.app.stage).toDataURL("image/png");
				} catch (error) {
					try {
						return this.app.view.toDataURL("image/png");
					} catch (error2) {
						return null;
					}
				}
			}
		};
		//#endregion
		//#region src/client/waifu/tools.js
		const fa_circle_user = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z\"/></svg>");
		const fa_camera_retro = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM344 304c0 48.6-39.4 88-88 88s-88-39.4-88-88s39.4-88 88-88s88 39.4 88 88z\"/></svg>");
		const fa_circle_info = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z\"/></svg>");
		const fa_xmark = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><path d=\"M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z\"/></svg>");
		const tools = {
			"switch-model": {
				icon: fa_circle_user,
				callback: () => {}
			},
			"photo": {
				icon: fa_camera_retro,
				callback: () => {}
			},
			"info": {
				icon: fa_circle_info,
				callback: () => {
					showMessage({
						expression: () => null,
						motion: () => null
					}, {
						text: "Afterglow Live2D 桌宠插件 · 5 角色 × 426 套换装",
						motion: "smile01"
					}, 4e3, 10);
				}
			},
			"quit": {
				icon: fa_xmark,
				callback: () => {
					localStorage.setItem("waifu-display", Date.now());
					const waifu = document.getElementById("waifu");
					if (waifu) waifu.style.bottom = "-500px";
					setTimeout(() => {
						const toggle = document.getElementById("waifu-toggle");
						if (toggle) toggle.classList.add("waifu-toggle-active");
					}, 3e3);
				}
			}
		};
		//#endregion
		//#region src/client/waifu/characters.js
		/**
		* 角色元数据与模型资源名工具（Afterglow 版）。
		*
		* 模型目录为 `<standalone编号>_<资源id>`（如 `028_live_event_41_sr`），编号来自
		* 独立版 BANDORI 看板娘的 STANDALONE_CHARS。换装面板的显示名由 textureLabel() 把
		* 资源段名翻译成中文（如 `028_live_event_41_sr` → 「活动41 SR」），目录名本身保持不变。
		*/
		const CHARACTERS = [
			{
				"id": "ran",
				"num": 28,
				"name": "美竹 蘭",
				"en": "Ran",
				"color": "#e84855"
			},
			{
				"id": "moca",
				"num": 23,
				"name": "青葉 モカ",
				"en": "Moca",
				"color": "#9b59b6"
			},
			{
				"id": "himari",
				"num": 10,
				"name": "上原 ひまり",
				"en": "Himari",
				"color": "#f4c95d"
			},
			{
				"id": "tomoe",
				"num": 40,
				"name": "宇田川 巴",
				"en": "Tomoe",
				"color": "#5b9bd5"
			},
			{
				"id": "tsugumi",
				"num": 43,
				"name": "羽沢 つぐみ",
				"en": "Tsugumi",
				"color": "#6bbf59"
			}
		];
		/**
		* 资源段名（去掉 3 位编号前缀后）→ 中文显示名规则，按顺序匹配，命中即止。
		* `$1` 等为捕获组引用；函数形式可做数值化等处理。
		*/
		const LABEL_RULES = [
			[/^casual_summer-2023$/, "夏常服2023"],
			[/^casual_winter-2023$/, "冬常服2023"],
			[/^casual-2023$/, "常服2023"],
			[/^casual_summer$/, "夏常服"],
			[/^casual_winter$/, "冬常服"],
			[/^casual$/, "常服"],
			[/^school_summer-2023$/, "校服夏2023"],
			[/^school_winter-2023$/, "校服冬2023"],
			[/^school_summer$/, "校服夏"],
			[/^school_winter_v3$/, "校服冬V3"],
			[/^school_winter$/, "校服冬"],
			[/^swimsuit-2023$/, "泳装2023"],
			[/^swimsuit$/, "泳装"],
			[/^yukata$/, "浴衣"],
			[/^(\d{4})_furisode$/, "振袖$1"],
			[/^arbeit$/, "打工"],
			[/^pajamas-(\d{4})$/, "睡衣$1"],
			[/^pajamas$/, "睡衣"],
			[/^chapter0_pajamas$/, "序章睡衣"],
			[/^chapter0_live$/, "序章演出"],
			[/^gym_clothes$/, "体操服"],
			[/^cafe$/, "咖啡厅"],
			[/^halloween$/, "万圣节"],
			[/^christmas_01$/, "圣诞"],
			[/^birthday_(\d{4})$/, "生日$1"],
			[/^birthday$/, "生日"],
			[/^dream_festival_(\d+)(_ur)?$/, "梦祭$1"],
			[/^dream_festival$/, "梦祭"],
			[/^collabo_d_1_ur$/, "联动D1"],
			[/^4th_general_election_r$/, "第4届总选举"],
			[/^2018_dog$/, "戌年2018"],
			[/^2021af$/, "周年祭2021"],
			[/^girlparty2019$/, "少女派对2019"],
			[/^garupa_t$/, "ガルパT恤"],
			[/^kirameki_festival$/, "闪耀祭"],
			[/^precious_summer$/, "珍贵夏日"],
			[/^special_5th$/, "5周年特别"],
			[/^popipa_fes$/, "PoPiPa祭"],
			[/^delta$/, "Delta"],
			[/^miku_nocturnality$/, "初音联动·夜行性"],
			[/^miku_romecin$/, "初音联动·Romecin"],
			[/^live_default$/, "默认演出"],
			[/^live_r_(\d{4})$/, "演出R$1"],
			[/^live_r$/, "演出R"],
			[/^live_sr_(\d+)$/, "演出SR$1"],
			[/^live_ssr_(\d+)$/, "演出SSR$1"],
			[/^live_event_(\d+)_([a-z]+)$/, (m, n, r) => `活动${+n} ${r.toUpperCase()}`],
			[/^live_event_(\d+)$/, (m, n) => `活动${+n}`],
			[/^event_(\d+)_story_(\d+)$/, "活动$1剧情$2"]
		];
		/**
		* 从模型目录名中提取展示标签（中文）。
		* `028_live_event_41_sr` → 「活动41 SR」；未命中规则的段名回退原始段名。
		*/
		function textureLabel(dir) {
			const seg = dir.split("/").pop();
			const body = seg.replace(/^\d{3}_/, "");
			for (const [re, out] of LABEL_RULES) if (re.test(body)) return body.replace(re, out);
			return seg;
		}
		/** 去掉目录名末尾的中文标签，得到原始资源 id（本版本段名无中文标签，原样返回）。 */
		function stripTextureLabel(dir) {
			return dir.replace(/_\p{Script=Han}[\p{Script=Han}0-9A-Za-z]*$/u, "");
		}
		/** 由模型目录名得到平铺在 `assets/` 下的资源文件名。 */
		function textureAssetId(dir) {
			return stripTextureLabel(dir);
		}
		/**
		* 该换装是否有缩略图资源。本版本无逐套缩略图，一律返回 false（面板显示文字标签）。
		*/
		function hasTextureAsset(dir) {
			return false;
		}
		//#endregion
		//#region src/client/waifu/index.js
		const TOOL_TITLES = {
			"switch-model": "切换角色",
			"photo": "拍照",
			"info": "关于",
			"quit": "隐藏"
		};
		/** 轻量监听/定时器收集器：插件卸载时统一清理 */
		function createHooks() {
			const listeners = [];
			const intervals = [];
			return {
				on(target, event, fn) {
					target.addEventListener(event, fn);
					listeners.push([
						target,
						event,
						fn
					]);
				},
				interval(fn, ms) {
					intervals.push(setInterval(fn, ms));
				},
				stop() {
					for (const [target, event, fn] of listeners) try {
						target.removeEventListener(event, fn);
					} catch {}
					for (const id of intervals) clearInterval(id);
					listeners.length = 0;
					intervals.length = 0;
				}
			};
		}
		async function loadWidget(hooks) {
			document.body.insertAdjacentHTML("beforeend", `
    <div id="waifu">
      <canvas id="live2d" width="800" height="800"></canvas>
      <div id="waifu-tips"></div>
      <div id="waifu-tool"></div>
    </div>
    <div id="model-selection-panel" class="waifu-panel" style="display: none;"></div>
    <div id="texture-selection-panel" class="waifu-panel" style="display: none;"></div>`);
			const model = new Model();
			localStorage.removeItem("waifu-display");
			sessionStorage.removeItem("waifu-text");
			const waifu = document.getElementById("waifu");
			const toolBar = document.getElementById("waifu-tool");
			const modelPanel = document.getElementById("model-selection-panel");
			const texturePanel = document.getElementById("texture-selection-panel");
			let selectedModelIndex = null;
			for (const panel of [modelPanel, texturePanel]) panel.addEventListener("wheel", (event) => event.stopPropagation(), {
				passive: true,
				capture: true
			});
			const drag = enableDrag(waifu);
			restorePosition(waifu);
			const waifuRect = () => waifu.getBoundingClientRect();
			function openPanel(panel) {
				panel.style.display = "block";
				const pw = panel.offsetWidth, ph = panel.offsetHeight;
				const rect = waifuRect();
				let left = rect.right + 8;
				if (left + pw > window.innerWidth - 8) left = rect.left - pw - 8;
				left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
				const top = Math.max(8, Math.min(rect.top, window.innerHeight - ph - 8));
				panel.style.position = "fixed";
				panel.style.left = left + "px";
				panel.style.top = top + "px";
				panel.style.right = "auto";
				panel.style.bottom = "auto";
			}
			function closePanels() {
				modelPanel.style.display = "none";
				texturePanel.style.display = "none";
			}
			tools["switch-model"].callback = () => {
				if (modelPanel.style.display !== "none") {
					closePanels();
					return;
				}
				renderModelPanel();
				openPanel(modelPanel);
			};
			tools["photo"].callback = () => {
				const url = model.capture();
				if (!url) {
					showMessage(model, {
						text: "呜……拍照失败了，再试一次吧？",
						motion: "sad01"
					}, 4e3, 10);
					return;
				}
				const a = document.createElement("a");
				a.href = url;
				a.download = `live2d-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				showMessage(model, {
					text: "拍好啦！这张照片，要好好珍藏哦！",
					motion: "smile01"
				}, 4e3, 10);
			};
			if (!Array.isArray(getConfig().tools)) getConfig().tools = Object.keys(tools);
			for (const tool of getConfig().tools) {
				if (!tools[tool]) continue;
				const { icon, callback } = tools[tool];
				toolBar.insertAdjacentHTML("beforeend", `<span id="waifu-tool-${tool}" title="${TOOL_TITLES[tool] || tool}">${decodeURIComponent(icon).replace("data:image/svg+xml,", "")}</span>`);
				document.getElementById(`waifu-tool-${tool}`).addEventListener("click", callback);
			}
			function renderModelPanel() {
				let html = "";
				MODEL_LIST.forEach((textures, index) => {
					const char = CHARACTERS[index];
					const asset = `${getConfig().cdnPath}assets/chara_icon_${char.num}.png`;
					html += `
            <button class="model-option" data-model-index="${index}" style="--accent:${char.color}">
              <img src="${asset}" alt="${char.name}" loading="lazy">
              <span class="model-option-text">
                <span class="model-option-name">${char.name}</span>
                <span class="model-option-en">${char.en}</span>
              </span>
            </button>`;
				});
				modelPanel.innerHTML = `
            <div class="waifu-panel-header"><span>选择角色</span><button class="waifu-panel-close" aria-label="关闭">✕</button></div>
            <div class="waifu-panel-body">${html}</div>`;
			}
			function renderTexturePanel(charIndex) {
				const char = CHARACTERS[charIndex];
				const textures = MODEL_LIST[charIndex];
				let html = "";
				textures.forEach((dir, index) => {
					const label = textureLabel(dir);
					const base = textureAssetId(dir);
					const asset = `${getConfig().cdnPath}assets/${base}.png`;
					if (hasTextureAsset(dir)) html += `
                <button class="texture-option" data-texture-index="${index}">
                  <img src="${asset}" alt="${label}" loading="lazy">
                  <span>${label}</span>
                </button>`;
					else html += `
                <button class="texture-option texture-option-text" data-texture-index="${index}">
                  <span>${label}</span>
                </button>`;
				});
				texturePanel.innerHTML = `
            <div class="waifu-panel-header">
              <button class="waifu-panel-back" aria-label="返回">←</button>
              <span>${char.name} · 换装</span>
              <button class="waifu-panel-close" aria-label="关闭">✕</button>
            </div>
            <div class="waifu-panel-body">${html}</div>`;
			}
			hooks.on(modelPanel, "click", async (event) => {
				if (event.target.closest(".waifu-panel-close")) {
					closePanels();
					return;
				}
				const button = event.target.closest(".model-option");
				if (!button) return;
				selectedModelIndex = parseInt(button.getAttribute("data-model-index"), 10);
				renderTexturePanel(selectedModelIndex);
				modelPanel.style.display = "none";
				openPanel(texturePanel);
			});
			hooks.on(texturePanel, "click", async (event) => {
				if (event.target.closest(".waifu-panel-close")) {
					closePanels();
					return;
				}
				if (event.target.closest(".waifu-panel-back")) {
					texturePanel.style.display = "none";
					openPanel(modelPanel);
					return;
				}
				const button = event.target.closest(".texture-option");
				if (!button) return;
				const textureIndex = parseInt(button.getAttribute("data-texture-index"), 10);
				closePanels();
				await model.loadModel(selectedModelIndex, textureIndex);
			});
			hooks.on(document, "click", (event) => {
				if (event.target.closest("#model-selection-panel") || event.target.closest("#texture-selection-panel") || event.target.closest("#waifu-tool") || event.target.closest("#waifu-toggle")) return;
				closePanels();
			});
			hooks.on(document, "keydown", (event) => {
				if (event.key === "Escape") closePanels();
			});
			registerEventListener(model, drag, hooks);
			const api = {
				loadModel: (charId, texId) => model.loadModel(charId, texId),
				getModelList: () => MODEL_LIST,
				getState: () => ({
					modelId: getModelId(),
					modelTexturesId: getModelTexturesId()
				}),
				capture: () => model.capture(),
				playRandomIdle: () => model.playRandomIdle(),
				showMessage,
				debug: () => ({
					stageChildren: model.app.stage.children.length,
					modelLoaded: !!model.model,
					modelSize: model.model ? {
						w: Math.round(model.model.width),
						h: Math.round(model.model.height)
					} : null,
					appRunning: !!(model.app.ticker && model.app.ticker.started),
					canvas: model.app.view ? {
						id: model.app.view.id,
						w: model.app.view.width,
						h: model.app.view.height
					} : null,
					pixiVersion: window.PIXI && window.PIXI.VERSION
				})
			};
			window.L2D = api;
			if (getModelId() === null) resetModelState();
			await model.loadModel(getModelId(), getModelTexturesId());
			return () => {
				hooks.stop();
				clearMessageTimer();
				try {
					model.app.destroy(true);
				} catch {}
				for (const el of [
					waifu,
					modelPanel,
					texturePanel
				]) try {
					if (el && el.parentNode) el.parentNode.removeChild(el);
				} catch {}
				if (window.L2D === api) window.L2D = void 0;
			};
		}
		function enableDrag(widgetEl) {
			const drag = {
				active: false,
				moved: false,
				startX: 0,
				startY: 0,
				originX: 0,
				originY: 0
			};
			widgetEl.addEventListener("pointerdown", (event) => {
				if (event.target.closest("#waifu-tool") || event.target.closest(".waifu-panel") || event.target.closest("#waifu-toggle")) return;
				drag.active = true;
				drag.moved = false;
				drag.startX = event.clientX;
				drag.startY = event.clientY;
				const rect = widgetEl.getBoundingClientRect();
				drag.originX = rect.left;
				drag.originY = rect.top;
				widgetEl.classList.add("waifu-dragging");
				try {
					widgetEl.setPointerCapture(event.pointerId);
				} catch (error) {}
			});
			widgetEl.addEventListener("pointermove", (event) => {
				if (!drag.active) return;
				const dx = event.clientX - drag.startX;
				const dy = event.clientY - drag.startY;
				if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
				if (!drag.moved) return;
				const left = Math.min(Math.max(drag.originX + dx, -120), window.innerWidth - 40);
				const top = Math.min(Math.max(drag.originY + dy, -80), window.innerHeight - 40);
				widgetEl.style.left = left + "px";
				widgetEl.style.top = top + "px";
				widgetEl.style.right = "auto";
				widgetEl.style.bottom = "auto";
			});
			const endDrag = (event) => {
				if (!drag.active) return;
				drag.active = false;
				widgetEl.classList.remove("waifu-dragging");
				if (drag.moved) {
					const rect = widgetEl.getBoundingClientRect();
					try {
						localStorage.setItem("waifu-pos", JSON.stringify({
							left: rect.left,
							top: rect.top
						}));
					} catch (error) {}
				}
			};
			widgetEl.addEventListener("pointerup", endDrag);
			widgetEl.addEventListener("pointercancel", endDrag);
			return drag;
		}
		function restorePosition(widgetEl) {
			try {
				const pos = JSON.parse(localStorage.getItem("waifu-pos"));
				if (!pos || typeof pos.left !== "number" || typeof pos.top !== "number") return;
				const left = Math.min(Math.max(pos.left, -120), window.innerWidth - 40);
				const top = Math.min(Math.max(pos.top, -80), window.innerHeight - 40);
				widgetEl.style.left = left + "px";
				widgetEl.style.top = top + "px";
				widgetEl.style.right = "auto";
				widgetEl.style.bottom = "auto";
			} catch (error) {}
		}
		function registerEventListener(model, drag, hooks) {
			let userAction = false;
			let idleSeconds = 0;
			let lastHoverElement;
			let lastFocusTime = 0;
			hooks.on(window, "mousemove", (event) => {
				userAction = true;
				const now = Date.now();
				if (now - lastFocusTime > 50) {
					lastFocusTime = now;
					model.focusAt(event.clientX, event.clientY);
				}
			});
			hooks.on(window, "mousedown", () => userAction = true);
			hooks.on(window, "keydown", () => userAction = true);
			hooks.on(window, "scroll", () => userAction = true, true);
			hooks.interval(() => {
				if (userAction) {
					userAction = false;
					idleSeconds = 0;
					return;
				}
				idleSeconds++;
				if (idleSeconds === 18) showMessage(model, getMessageArray(), 6e3, 9);
				else if (idleSeconds > 18 && idleSeconds % 30 === 0) model.playRandomIdle();
			}, 1e3);
			hooks.on(window, "mouseover", (event) => {
				if (event.target.closest("#live2d")) {
					showMessage(model, getMessageArray(), 4e3, 9);
					return;
				}
				for (const { selector, text } of tips.mouseover) {
					if (!event.target.closest(selector)) continue;
					if (lastHoverElement === selector) return;
					lastHoverElement = selector;
					showMessage(model, randomSelection(text[getModelId()]), 4e3, 10);
					return;
				}
			});
			hooks.on(window, "click", (event) => {
				if (drag.moved) return;
				if (event.target.closest("#live2d")) {
					showMessage(model, getMessageArray(), 4e3, 9);
					return;
				}
				for (const { selector, text } of tips.mouseover) {
					if (!event.target.closest(selector)) continue;
					showMessage(model, randomSelection(text[getModelId()]), 4e3, 10);
					return;
				}
			});
			hooks.on(window, "resize", () => {
				const threshold = 160;
				const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
				const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
				if (widthDiff > threshold || heightDiff > threshold) showMessage(model, tips.message.console[getModelId()], 6e3, 9);
			});
			hooks.on(window, "copy", () => {
				showMessage(model, tips.message.copy[getModelId()], 6e3, 9);
			});
			hooks.on(document, "visibilitychange", () => {
				if (!document.hidden) showMessage(model, tips.message.visibilitychange[getModelId()], 6e3, 9);
			});
		}
		/**
		* 启动桌宠。返回停止函数（插件卸载时调用）：清理监听/定时器、销毁渲染器、移除 DOM。
		*/
		async function initWidget(config) {
			const hooks = createHooks();
			setConfig(config);
			document.getElementById("waifu-toggle")?.remove();
			document.getElementById("waifu")?.remove();
			document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle"><span>Live2D</span></div>`);
			const toggle = document.getElementById("waifu-toggle");
			let stopWidget = () => {};
			const toggleStop = () => {
				hooks.stop();
				try {
					if (toggle && toggle.parentNode) toggle.parentNode.removeChild(toggle);
				} catch {}
				stopWidget();
			};
			hooks.on(toggle, "click", async () => {
				toggle.classList.remove("waifu-toggle-active");
				if (toggle.getAttribute("first-time")) {
					stopWidget = await loadWidget(hooks);
					toggle.removeAttribute("first-time");
				} else {
					localStorage.removeItem("waifu-display");
					const waifuEl = document.getElementById("waifu");
					if (waifuEl) {
						waifuEl.style.display = "";
						setTimeout(() => {
							waifuEl.style.bottom = "20px";
						}, 0);
					}
				}
			});
			if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 864e5) {
				toggle.setAttribute("first-time", true);
				setTimeout(() => {
					toggle.classList.add("waifu-toggle-active");
				}, 0);
			} else stopWidget = await loadWidget(hooks);
			return toggleStop;
		}
		//#endregion
		//#region src/client/index.ts
		/** vendor 运行时脚本（host 同源路由，按依赖顺序加载）。
		*  Cubism 2.1 渲染链：live2d.min.js（框架，暴露 window.Live2D / Live2DModelWebGL）
		*  → pixi.min.js（PIXI 6）→ live2d-display.cubism2.min.js（pixi-live2d-display
		*  0.4.0 的 cubism2 版，运行时校验 window.Live2D 存在）。
		*  Cubism 2.1 不需要 live2dcubismcore.min.js（那是 Cubism 4 链的依赖）。
		*/
		const VENDOR_SCRIPTS = [
			"/ag-assets/vendor/live2d.min.js",
			"/ag-assets/vendor/pixi.min.js",
			"/ag-assets/vendor/live2d-display.cubism2.min.js"
		];
		/** 桌宠容器与面板的 z-index 覆盖（dsh GUI 上方悬浮）+ 默认放右下（避开左侧栏）。 */
		const Z_INDEX_OVERRIDE = `
#waifu, #waifu-toggle { z-index: 2147483646 !important; }
.waifu-panel { z-index: 2147483647 !important; }
#waifu { left: auto; right: 20px; top: 20px; bottom: auto; }
`;
		function loadScript(src) {
			return new Promise((resolve, reject) => {
				const tag = document.createElement("script");
				tag.src = src;
				tag.onload = () => resolve();
				tag.onerror = () => reject(/* @__PURE__ */ new Error(`加载 ${src} 失败`));
				document.head.appendChild(tag);
			});
		}
		/** 插件入口：注入 CSS + 按序加载运行时 + 启动桌宠；清理注册为 ctx.effect disposer。 */
		function apply(ctx) {
			ctx.effect(() => {
				const cleanup = [];
				let disposed = false;
				const stop = () => {
					if (disposed) return;
					disposed = true;
					for (const fn of cleanup) try {
						fn();
					} catch {}
					cleanup.length = 0;
				};
				fetch("/ag-assets/waifu.css").then((res) => res.ok ? res.text() : Promise.reject(/* @__PURE__ */ new Error(`HTTP ${res.status}`))).then((css) => {
					if (disposed) return;
					const style = document.createElement("style");
					style.id = "live2d-afterglow-css";
					style.textContent = css + Z_INDEX_OVERRIDE;
					document.head.appendChild(style);
					cleanup.push(() => style.remove());
				}).catch((error) => console.error("[live2d-afterglow] 样式加载失败", error));
				(async () => {
					for (const src of VENDOR_SCRIPTS) {
						await loadScript(src);
						if (disposed) return;
					}
					if (disposed) return;
					try {
						await initWidget({
							cdnPath: "/ag-assets/",
							preload: "IDLE",
							tools: [
								"switch-model",
								"photo",
								"info",
								"quit"
							]
						});
					} catch (error) {
						console.error("[live2d-afterglow] 桌宠启动失败", error);
					}
				})();
				return stop;
			}, "live2d-afterglow: widget");
		}
		//#endregion
		exports.apply = apply;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map