import { ref } from 'vue'

export type LicenseType = 'MIT' | 'Apache-2.0' | 'AGPL-3.0-or-later' | string

const isLicenseModalOpen = ref(false)
const currentLicenseType = ref<LicenseType>('MIT')

export function useLicenseModal() {
  function openLicenseModal(license: LicenseType = 'MIT') {
    currentLicenseType.value = license
    isLicenseModalOpen.value = true
  }

  function closeLicenseModal() {
    isLicenseModalOpen.value = false
  }

  return {
    isOpen: isLicenseModalOpen,
    currentLicense: currentLicenseType,
    openLicenseModal,
    closeLicenseModal
  }
}
