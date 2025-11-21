type ConfigType = {
	secrets: {
		apiHost: string;
		appUrl: string;
	};
};

let cache: ConfigType | undefined;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "staging";

const config = (): ConfigType => {
	if (!cache) {
		cache = Object.freeze({
			secrets: {
				apiHost:
					environment === "staging"
						? "https://stagingapi.rewardclan.com"
						: "https://api.rewardclan.com",				
				appUrl:
					environment === "staging"
						? "https://staging.rewardclan.com"
						: "https://app.rewardclan.com",
			},
		});
	}
	return cache;
};

export default config;
