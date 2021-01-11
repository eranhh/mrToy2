import { connect } from 'react-redux'
import { ToyPreview } from "./ToyPreview.jsx"

function _ToyList({ toys }) {
    if (!toys || !toys.length) return <div className="loader"></div>
    return <div className="toy-list grid j-center main-layout">
        {toys.length && toys.map(toy => {
            return <ToyPreview key={toy._id} toy={toy} />
        })}
    </div>
}

const mapStateToProps = (state) => {
    return { toys: state.toyModule.toys }
}

export const ToyList = connect(mapStateToProps)(_ToyList)