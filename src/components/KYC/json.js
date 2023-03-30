export const json = {
  title: 'TrySpacely',
  logo: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg',
  logoWidth: 60,
  logoHeight: 60,
  elements: [
    {
      type: 'dropdown',
      title: 'Means of Identification',
      // name: 'means_of_id',
      isRequired: true,
      showNoneItem: false,
      showOtherItem: false,
      choices: ['Driver License', 'International Passport'],
    },
    {
      type: 'file',
      title: 'Please upload your KYC document',
      name: 'document',
      isRequired: true,
      storeDataAsText: false,
      showPreview: true,
      imageWidth: 500,
      imageHeight: 450,
      maxSize: 1024000,
    },
  ],
  showQuestionNumbers: false,
}
