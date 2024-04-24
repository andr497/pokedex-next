import "@/styles/loading.css"

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-[10000]">
            <article className="grid place-content-center place-items-center h-screen">
                <span className="loader-loading"></span>
                <span className="loader"></span>
            </article>
        </div>
    );
};

export default Loading;
