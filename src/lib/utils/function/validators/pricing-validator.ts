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

	// Check if at least one pricing option is enabled
	const hasEnabledRate = Object.values(pricing).some((config) => config.enabled);
	if (!hasEnabledRate) {
		errors.push({
			message: 'At least one pricing rate must be enabled'
		});
		return errors;
	}

	Object.entries(pricing).forEach(([type, config]) => {
		if (config.enabled) {
			if (!config.rate || config.rate <= 0) {
				errors.push({
					type,
					message: `${type.charAt(0).toUpperCase() + type.slice(1)} rate must be greater than 0`
				});
			} else {
				switch (type) {
					case 'hourly':
						if (config.rate > 1000) {
							errors.push({ type, message: 'Hourly rate cannot exceed ₱1,000' });
						}
						break;
					case 'daily':
						if (config.rate > 10000) {
							errors.push({ type, message: 'Daily rate cannot exceed ₱10,000' });
						}
						break;
					case 'monthly':
						if (config.rate > 50000) {
							errors.push({ type, message: 'Monthly rate cannot exceed ₱50,000' });
						}
						break;
				}
			}
		}
	});

	return errors;
}
