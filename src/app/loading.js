import GhostSpinner from "@/components/ghostSpinner/GhostSpinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div style={{ width: '100vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GhostSpinner size={50} /></div>
}