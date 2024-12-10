// Helper function to structure the form data
export default function newParkingManagerRequestBody(formData: FormData) {
    const is24_7 = String(formData.get('is247')).toLowerCase() === 'true';
    const ownerInfo = {
        individual: {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            middle_name: formData.get('middleName') as string,
            suffix: formData.get('suffix') as string
        },
        company: {
            company_name: formData.get('companyName') as string,
            company_registration_number: formData.get('companyRegNumber') as string
        }
    };

    const contactInfo = {
        email: formData.get('email') as string,
        contact_number: formData.get('contactNumber') as string,
        tax_identification_number: formData.get('tin') as string
    };

    const locationInfo = {
        street_address: formData.get('streetAddress') as string,
        barangay: formData.get('barangay') as string,
        city: formData.get('city') as string,
        province: formData.get('province') as string,
        postal_code: formData.get('postalCode') as string,
        landmarks: formData.get('landmarks') as string,
        coordinates: {
            longitude: formData.get('longitude') as string,
            latitude: formData.get('latitude') as string
        }
    };

    const parkingDetails = {
        space_type: formData.get('spaceType') as string,
        space_layout: formData.get('spaceLayout') as string,
        space_dimensions: formData.get('spaceDimensions') as string,
        access_information: formData.get('accessInformation') as string,
        zoning_compliance: formData.get('zoningCompliance') as string,
        is_24_7: is24_7
    };

    const facilitiesInfo = {
        lighting_and_security: formData.get('lightingAndSecurity') as string,
        accessibility: formData.get('accessibility') as string,
        nearby_facilities: formData.get('nearbyFacilities') as string
    };

    const operatingHours = is24_7
        ? {
              monday: { enabled: true, open: '00:00', close: '23:59' },
              tuesday: { enabled: true, open: '00:00', close: '23:59' },
              wednesday: { enabled: true, open: '00:00', close: '23:59' },
              thursday: { enabled: true, open: '00:00', close: '23:59' },
              friday: { enabled: true, open: '00:00', close: '23:59' },
              saturday: { enabled: true, open: '00:00', close: '23:59' },
              sunday: { enabled: true, open: '00:00', close: '23:59' }
          }
        : {
              monday: {
                  enabled: String(formData.get('monday.enabled')).toLowerCase() === 'true',
                  open: formData.get('monday.open') as string,
                  close: formData.get('monday.close') as string
              },
              tuesday: {
                  enabled: String(formData.get('tuesday.enabled')).toLowerCase() === 'true',
                  open: formData.get('tuesday.open') as string,
                  close: formData.get('tuesday.close') as string
              },
              wednesday: {
                  enabled: String(formData.get('wednesday.enabled')).toLowerCase() === 'true',
                  open: formData.get('wednesday.open') as string,
                  close: formData.get('wednesday.close') as string
              },
              thursday: {
                  enabled: String(formData.get('thursday.enabled')).toLowerCase() === 'true',
                  open: formData.get('thursday.open') as string,
                  close: formData.get('thursday.close') as string
              },
              friday: {
                  enabled: String(formData.get('friday.enabled')).toLowerCase() === 'true',
                  open: formData.get('friday.open') as string,
                  close: formData.get('friday.close') as string
              },
              saturday: {
                  enabled: String(formData.get('saturday.enabled')).toLowerCase() === 'true',
                  open: formData.get('saturday.open') as string,
                  close: formData.get('saturday.close') as string
              },
              sunday: {
                  enabled: String(formData.get('sunday.enabled')).toLowerCase() === 'true',
                  open: formData.get('sunday.open') as string,
                  close: formData.get('sunday.close') as string
              }
          };

    const paymentInfo = {
        payment_methods: {
            cash: formData.get('cash') === 'true',
            mobile: formData.get('mobile') === 'true',
            other_payment: formData.get('otherPayment') as string
        },
        pricing: {
            hourly: {
                enabled: String(formData.get('hourly.enabled')).toLowerCase() === 'true',
                rate: parseFloat(formData.get('hourly.rate') as string)
            },
            daily: {
                enabled: String(formData.get('daily.enabled')).toLowerCase() === 'true',
                rate: parseFloat(formData.get('daily.rate') as string)
            },
            monthly: {
                enabled: String(formData.get('monthly.enabled')).toLowerCase() === 'true',
                rate: parseFloat(formData.get('monthly.rate') as string)
            }
        }
    };

    const documents = {
        document: [
            {
                name: 'gov_id',
                file: formData.get('govId')
            },
            {
                name: 'parking_photos',
                files: Array.from(formData.getAll('parkingPhotos'))
            },
            {
                name: 'proof_of_ownership',
                file: formData.get('proofOfOwnership')
            },
            {
                name: 'bir_cert',
                file: formData.get('birCert')
            },
            {
                name: 'liability_insurance',
                file: formData.get('liabilityInsurance')
            },
            {
                name: 'business_cert',
                file: formData.get('businessCert')
            }
        ].filter((doc) => doc.file instanceof File || (doc.files && doc.files.length > 0))
    };

    return {
        ownerInfo,
        contactInfo,
        locationInfo,
        parkingDetails,
        facilitiesInfo,
        operatingHours,
        paymentInfo,
        documents
    };
}
