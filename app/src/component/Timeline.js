import '../style/Timeline.scss';

export default function Timeline(props) {
    const { timeline, status_names, isSO } = props;

    function by(status) {
        if (isSO === 1) {
            switch (status) {
                case '0': return "Retailer";
                case '1': return "Retailer";
                case '2': return "Manager";
                case '4': return "Manager";
                case '5': return "Retailer";
            }
        }
        else if (isSO === 0) {
            switch (status) {
                case '0': return "Manager";
                case '1': return "Manager";
                case '2': return "Supplier";
                case '4': return "Supplier";
                case '5': return "Manager";
            }
        }
        else {
            switch (status) {
                case '0': return "Manager";
                case '1': return "Producer";
                case '2': return "Producer";
                case '3': return "Producer";
            }
        }
    }

    return (
        <div className='timeline-container'>
            <h3>Timeline:</h3>
            <ul className="timeline">
                {
                    timeline.map(event => (
                        <li key={event.status}>
                            <span className='time'>{new Date(parseInt(event.timestamp) * 1000).toLocaleString()}</span>
                            -
                            <span className='status'>{status_names[event.status]} by {by(event.status)}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}