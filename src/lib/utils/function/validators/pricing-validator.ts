export interface PricingConfig {
	enabled: boolean;
	rate: number;
}

export interface PricingValidationError {
	type?: string;
	message: string;
}

export function validatePricing(pricing: Record<string, PricingConfig>): PricingValidationError[] {
	const errors: PricingValidationError[] = [];

	const hasEnabledRate = Object.values(pricing).some((config) => config.enabled);
	if (!hasEnabledRate) {
		errors.push({
			message: 'At least one pricing rate must be enabled'
		});
	}

	Object.entries(pricing).forEach(([type, config]) => {
		if (config.enabled) {
			if (!config.rate || config.rate <= 0) {
				errors.push({
					type,
					message: 'Rate must be greater than 0'
				});
			}

			if (type === 'hourly' && config.rate > 1000) {
				errors.push({
					type,
					message: 'Hourly rate cannot exceed ₱1,000'
				});
			}
			if (type === 'daily' && config.rate > 10000) {
				errors.push({
					type,
					message: 'Daily rate cannot exceed ₱10,000'
				});
			}
			if (type === 'monthly' && config.rate > 50000) {
				errors.push({
					type,
					message: 'Monthly rate cannot exceed ₱50,000'
				});
			}
		}
	});

	return errors;
}
