export default function useYmTriggers() {
	const runtimeConfig = useRuntimeConfig();

	function hitGoToTG() {
		const YM = (window as typeof window & { ym: Function })?.ym;
		if (YM) {
			YM(runtimeConfig.public.YM_ID, 'reachGoal', 'tg_click');
		}
	}

	function hitPhoneClick() {
		const YM = (window as typeof window & { ym: Function })?.ym;
		if (YM) {
			YM(runtimeConfig.public.YM_ID, 'reachGoal', 'call_me');
		}
	}

	function hitNewOrder() {
		const YM = (window as typeof window & { ym: Function })?.ym;
		if (YM) {
			YM(runtimeConfig.public.YM_ID, 'reachGoal', 'new_order');
		}
	}

	function hitNewOrderCall() {
		const YM = (window as typeof window & { ym: Function })?.ym;

		if (YM) {
			YM(runtimeConfig.public.YM_ID, 'reachGoal', 'new_order_call');
		}
	}

	return {
		hitGoToTG,
		hitPhoneClick,
		hitNewOrder,
		hitNewOrderCall
	};
}
