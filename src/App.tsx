import { useState } from 'react'
import { ArrowRight, Check, CircleHelp, ExternalLink, LockKeyhole, ShieldCheck, Sparkles, WalletCards, X } from 'lucide-react'
import { connectLace, contractAddress, network, submitPrivateProof, TransactionState, WalletState } from './midnight'

const steps = ['Understand the proof', 'Connect Lace', 'Submit privately', 'Review your receipt']

function App() {
  const [walletState, setWalletState] = useState<WalletState>('disconnected')
  const [address, setAddress] = useState('')
  const [transactionState, setTransactionState] = useState<TransactionState>('idle')
  const [message, setMessage] = useState('')
  const [activeStep, setActiveStep] = useState(0)

  const handleConnect = async () => {
    setWalletState('connecting')
    setMessage('Opening Lace connection...')
    try {
      const wallet = await connectLace()
      setAddress(wallet.address)
      setWalletState('connected')
      setActiveStep(2)
      setMessage('Wallet connected. Your private proof is ready.')
    } catch (error) {
      setWalletState('disconnected')
      setMessage(error instanceof Error ? error.message : 'Unable to connect Lace.')
    }
  }

  const handleSubmit = async () => {
    if (!address) return
    setTransactionState('pending')
    setMessage('Preparing your private proof on Midnight...')
    try {
      const result = await submitPrivateProof(address)
      setTransactionState('success')
      setActiveStep(3)
      setMessage(`Confirmed: ${result.txId}`)
    } catch (error) {
      setTransactionState('error')
      setMessage(error instanceof Error ? error.message : 'The transaction could not be completed.')
    }
  }

  const resetTransaction = () => {
    setTransactionState('idle')
    setMessage('Ready for another proof.')
    setActiveStep(2)
  }

  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top"><span className="brand-mark"><LockKeyhole size={16} /></span> veilmark</a>
        <div className="nav-links"><a href="#how-it-works">How it works</a><a href="#privacy">Privacy</a><a href="#feedback">Feedback</a></div>
        <div className="network-pill"><span className="pulse" /> {network} <span className="network-dot">testnet</span></div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={14} /> Private proof, public confidence</p>
          <h1>Show you qualify.<br /><em>Keep the rest.</em></h1>
          <p className="lede">Veilmark lets you prove a claim without handing over the personal data behind it. Built for a more considerate web on Midnight.</p>
          <div className="hero-actions"><a className="button primary" href="#proof">Create a proof <ArrowRight size={17} /></a><a className="text-link" href="#how-it-works">See the flow <ArrowRight size={15} /></a></div>
          <div className="trust-row"><span><ShieldCheck size={16} /> Zero-knowledge by design</span><span><LockKeyhole size={16} /> Midnight Preprod</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract private proof visualization">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="proof-seal"><LockKeyhole size={34} /><span>proof<br /><strong>verified</strong></span></div>
          <div className="art-note note-one"><span className="note-icon green"><Check size={14} /></span><span>Eligibility<small>confirmed privately</small></span></div>
          <div className="art-note note-two"><span className="note-icon amber"><LockKeyhole size={14} /></span><span>Raw data<small>never revealed</small></span></div>
        </div>
      </section>

      <section className="proof-section shell" id="proof">
        <div className="section-heading"><div><p className="eyebrow">Your first proof</p><h2>A small step toward a quieter internet.</h2></div><span className="step-count">0{activeStep + 1} / 04</span></div>
        <div className="stepper" role="list">{steps.map((step, index) => <div className={`step ${index <= activeStep ? 'active' : ''}`} key={step} role="listitem"><span>{index < activeStep ? <Check size={14} /> : `0${index + 1}`}</span>{step}</div>)}</div>
        <div className="proof-grid">
          <div className="proof-card">
            <div className="card-top"><span className="card-label">TEST CLAIM</span><span className="private-tag"><LockKeyhole size={13} /> private</span></div>
            <h3>Prove you are testnet-ready</h3><p>The contract checks your private eligibility signal. The application only receives the result, never the underlying details.</p>
            <div className="claim-row"><span>Claim status</span><strong><span className="status-dot" /> Awaiting proof</strong></div>
            {walletState === 'connected' ? <div className="wallet-connected"><WalletCards size={18} /><span><small>Connected Lace wallet</small>{address}</span><button aria-label="Disconnect wallet" onClick={() => { setWalletState('disconnected'); setAddress(''); setActiveStep(1); setMessage('Wallet disconnected.') }}><X size={16} /></button></div> : <button className="button dark full" onClick={handleConnect} disabled={walletState === 'connecting'}><WalletCards size={17} />{walletState === 'connecting' ? 'Connecting...' : 'Connect Lace wallet'}</button>}
            {walletState === 'connected' && <button className="button primary full" onClick={handleSubmit} disabled={transactionState === 'pending'}>{transactionState === 'pending' ? 'Submitting proof...' : 'Submit private proof'} <ArrowRight size={17} /></button>}
            {message && <div className={`feedback ${transactionState}`} role="status">{transactionState === 'success' && <Check size={16} />}{message}</div>}
            {transactionState === 'error' && <button className="retry" onClick={resetTransaction}>Reset and try again</button>}
          </div>
          <aside className="side-panel"><div className="panel-icon"><CircleHelp size={19} /></div><h3>New to Midnight?</h3><p>Lace is your bridge to the Preprod network. You will need a testnet wallet and a small amount of testnet funds to submit a real transaction.</p><a href="https://www.lace.io/" target="_blank" rel="noreferrer">Open Lace <ExternalLink size={14} /></a><div className="mini-list"><span><b>01</b> Install or open Lace</span><span><b>02</b> Switch to Preprod</span><span><b>03</b> Request testnet tokens</span></div></aside>
        </div>
      </section>

      <section className="privacy-section" id="privacy"><div className="shell privacy-inner"><div><p className="eyebrow">Privacy, explained</p><h2>Reveal the answer.<br /><em>Protect the evidence.</em></h2></div><div className="privacy-copy"><p>Midnight lets the contract verify a statement without exposing the private input used to make it. That means your claim can be trusted without turning your identity into a product.</p><div className="privacy-table"><div><span className="table-key public">PUBLIC</span><span>Proof result and transaction metadata</span></div><div><span className="table-key private">PRIVATE</span><span>Your underlying personal information</span></div><div><span className="table-key contract">CONTRACT</span><span>Verifies the claim with Compact logic</span></div></div></div></div></section>

      <section className="how-section shell" id="how-it-works"><div className="section-heading"><div><p className="eyebrow">The model</p><h2>Trust without oversharing.</h2></div></div><div className="model-grid"><div><span className="model-num">01</span><h3>You hold the context</h3><p>Your private data stays with you and is never copied into this interface.</p></div><div><span className="model-num">02</span><h3>Compact checks the claim</h3><p>A Midnight smart contract evaluates the proof using privacy-preserving logic.</p></div><div><span className="model-num">03</span><h3>Everyone sees confidence</h3><p>The resulting proof can be verified without revealing your private context.</p></div></div></section>

      <section className="feedback-section shell" id="feedback"><div><p className="eyebrow">Help shape the next release</p><h2>Built in the open,<br /><em>improved with you.</em></h2></div><div><p>We are collecting real Preprod feedback from early users. No fabricated metrics, no quiet assumptions. Tell us where the experience needs to become clearer.</p><a className="button outline" href={import.meta.env.VITE_FEEDBACK_FORM_URL || '#'} target="_blank" rel="noreferrer">Share feedback <ExternalLink size={15} /></a></div></section>

      <footer className="footer shell"><span className="brand"><span className="brand-mark"><LockKeyhole size={16} /></span> veilmark</span><span>Blue Belt build · Midnight Network · Preprod</span><span>Contract: {contractAddress || 'not configured'}</span></footer>
    </main>
  )
}

export default App
