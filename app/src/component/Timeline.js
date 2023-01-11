import '../style/Timeline.scss';

export default function Timeline(props){
    const {timeline, status_names} = props;

    return(
        <div className='timeline-container'>
            <h3>Timeline:</h3>
            <ul className="timeline">
                {
                    timeline.map(event => (
                        <li key={event.status}>
                            <span className='time'>{new Date(parseInt(event.timestamp)*1000).toLocaleString()}</span>
                            -
                            <span className='status'>{status_names[event.status]}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}