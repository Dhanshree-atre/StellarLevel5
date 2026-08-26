export type WalletState = 'disconnected' | 'connecting' | 'connected'
export type TransactionState = 'idle' | 'pending' | 'success' | 'error'

export const network = import.meta.env.VITE_NETWORK || 'preprod'
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || ''

/** Replace these UI-safe stubs with the Lace + Midnight SDK integration. */
export async function connectLace(): Promise<{ address: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  throw new Error('Lace integration is not configured yet. Add the Midnight SDK adapter before using a live wallet.')
}

export async function submitPrivateProof(_address: string): Promise<{ txId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  throw new Error('No live contract adapter is configured. This preview never submits a fake transaction.')
}
