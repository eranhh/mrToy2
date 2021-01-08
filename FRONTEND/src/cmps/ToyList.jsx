import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemove }) {
    if (!toys || !toys.length) return <div className="loader"></div>
    return <div className="toy-list grid j-center main-layout">
        {toys.length && toys.map(toy => {
            return <ToyPreview key={toy._id} toy={toy} onRemove={onRemove} />
        })}
    </div>
}