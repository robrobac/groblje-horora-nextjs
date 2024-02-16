import GhostSpinner from "@/components/ghostSpinner/GhostSpinner";

export default function SingleLoading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div style={{ width: '100vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>aaaaaaaaaaaaaa<GhostSpinner size={50} /></div>
}