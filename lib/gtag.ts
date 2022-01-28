export const GA_TRACKING_ID = "G-K8LYX19069";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
	window.gtag("config", GA_TRACKING_ID, {
		page_path: url,
	});
};

type GTagEvent = {
	name: string;
	category: string;
	label: string;
	value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (event: GTagEvent): void => {
	window.gtag("event", event.name, {
		event_category: event.category,
		event_label: event.label,
		value: event.value,
	});
}
