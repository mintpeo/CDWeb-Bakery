import './loading.scss';

const Loading = () => {
    return (
        <div className="modal-loading">
            <div className='loading-pad'>
                <div className="loader">
                    <span className="loader-text">Xin chờ</span>
                    <span className="load" />
                </div>
            </div>
        </div>
    );
}

export default Loading;
