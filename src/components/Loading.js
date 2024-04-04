import loading from '../assets/loading.png';
import '../css/Loading.css';

export default function Loading() {
    return (
        <section id='loading'>
            <img className='icon' src={loading} alt='loading' />
            <p>
                Loading...
            </p>
        </section>
    )
}