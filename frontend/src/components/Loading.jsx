const Loading = () => {
    return (
        <div className="z-50 flex flex-col justify-center items-center w-screen h-screen -translate-y-12">
            <lottie-player src="/assets/Polite-Chicky.json" background="transparent" speed="1"  style={{"width": "300px", "height": "300px"}} loop autoplay></lottie-player>
            <h1 className="text-2xl">... Loading ...</h1>
        </div>
    )
}

export default Loading;