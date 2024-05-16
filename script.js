const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        // client X returns the horizontal mouse pointer coordinator
        const startX = e.clientX; 
        const thumbPosition = scrollbarThumb.offsetLeft;

        // update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            
            // ensure the thumb position does not exceed the maximum allowed position
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            // calculate the scroll position based on the thumb position
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            // update the thumb position and scroll position
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        // remove event listeners when mouse up
        const handleMouseUp = () => {
            document.removeEventListener ("mousemove", handleMouseMove);
            document.removeEventListener ("mouseup", handleMouseUp);
        };

        // add event listeners for drag interaction
        document.addEventListener ("mousemove", handleMouseMove);
        // stop the thumb from sliding after mouse up
        document.addEventListener ("mouseup", handleMouseUp);
    });

    // slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    // update scroll bar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / (imageList.scrollWidth - imageList.clientWidth)) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    imageList.addEventListener("scroll", () => { 
        handleSlideButtons();
        updateScrollThumbPosition();
    });
};

window.addEventListener("load", initSlider);